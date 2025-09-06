import { world_to_screen } from "./helperFns.js"
import { draw_rect, draw_circle } from './drawFns.js'
import { GameStates } from "./enums.js"

import { update as update_cannon } from './gamestates/cannon.js'
import { spawn_slice, update as update_shoot } from './gamestates/shoot.js'
import { update as update_lose } from './gamestates/lose.js'


import { draw_robo } from "./entities/robo.js"
import { draw_zapper } from "./entities/zapper.js"

const Vec2 = Vector

const display_debug = true;

/** Oh yeah. We're doin this. */
window.gamestate = {
  screen_width: -1, // Updated on load
  screen_height: -1, // Updated on load

  gravity: 600,

  distance: 0, // Kinda score
  high_score: 0,
  latest_slice_seen: 0,

  camera: {
    pos: new Vec2(0, 0),
    zoom: 1, // Actually scale. Probably unused
  },

  state: GameStates.CANNON,

  robo: {
    pos: new Vec2(0, 0),
    width: 64,
    height: 64,
    vel: new Vec2(0, 0),
    radius: 16,
    invincibility_timer: 0
  },

  cannon: {
    pos: new Vec2(50, 50),
    angle: 5,
    base_blast_power: 800,
  },

  slices: {
	}
};

// In the game world, 0, 0 is the bottom left corner and up goes higher.
// On the screen, 0, 0 is the top left corner. So here's some fns for conversion


export const change_state = (new_state) => {
  const gs = window.gamestate

  gs.state = new_state;

  switch (new_state) {
    case GameStates.CANNON: {
			// Reset Robo State
      gs.distance = 0;
      gs.robo.pos.x = 0;
      gs.robo.pos.y = -gs.robo.radius * 3;
      gs.robo.invincibility_timer = 0

      gs.latest_slice_seen = 0;

			for (const slice_id of Object.keys(gs.slices)) {
				delete gs.slices[slice_id]
			}

			spawn_slice(1)
			spawn_slice(2)
			spawn_slice(3)

      return;
    }
    case GameStates.SHOOT: {

      // TODO: change softkeys
      return

    }

    case GameStates.LOSE: {
			setTimeout(() => {
				gs.camera.pos.x = gs.screen_width / 2;
				gs.camera.pos.y = gs.screen_height / 2;
				change_state(GameStates.CANNON);
			}, 750)
      //return;
    }
  }
}

export const init = () => {

  const gs = window.gamestate

  console.log("Game is initing")

  /** Size the canvas up to the whole screen */
  const canv = document.getElementById("main-canvas")
  const screen = document.getElementById("game-screen")
  const screen_rect = screen.getBoundingClientRect()
  console.log(screen_rect.width)
  canv.width = screen_rect.width
  canv.height = screen_rect.height

  gs.screen_height = screen_rect.height
  gs.screen_width = screen_rect.width

  // Update camera to it looks at screen center
  gs.camera.pos.x = screen_rect.width / 2
  gs.camera.pos.y = screen_rect.height / 2


  // For DT calculation
  let old_date = Date.now();
  change_state(GameStates.CANNON);

  for (let i = 1; i <= 5; i++) {
    spawn_slice(i + 1);
  }
  gs.latest_slice_seen = 5;

  /** Launch */
  setInterval(() => {

    const now = Date.now();
    const dt = (now - old_date) / 1000;
    if (dt === 0) return;
    old_date = now;

    update(dt);
    draw(dt);

  }, 0)
}

export const handle_key = (key) => {
  const gs = window.gamestate;

  switch (key) {
    case "Enter": {
      console.log("Fire!")

      if (gs.state === GameStates.CANNON) {

        const dir = new Vec2(0, 1).rotateDegrees(-gs.cannon.angle) // Vector library still assumes y=-1 is straight up
        const newPos = gs.cannon.pos.add(dir.mulScalar(100))
        gs.robo.pos.x = newPos.x
        gs.robo.pos.y = newPos.y
        gs.robo.vel = dir.mulScalar(gs.cannon.base_blast_power);
        gs.robo.vel.x *= 1.3;

        change_state(GameStates.SHOOT)
      }

    }
    case "s": {
      console.log(gs.robo.vel)
    }
  }
}

export const update = (dt) => {

  const gs = window.gamestate;

  switch (gs.state) {
    case (GameStates.CANNON): {
      update_cannon(dt);
      return;
    }
    case (GameStates.SHOOT): {
      update_shoot(dt);
      return;
    }
    case (GameStates.LOSE): {
      update_lose(dt);
      return;
    }

  }


  draw()
}

// Anchor X and Y are still relative to the object like 0, 0 is it's top left lol.

export const draw = (dt) => {
  const gs = window.gamestate;

  const canvas = document.getElementById("main-canvas")
  const canvas_rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d")

  ctx.clearRect(0, 0, 50000, 50000);

  ctx.save();

  const camera_pos = world_to_screen(gs.camera.pos)
  if (camera_pos.y > gs.screen_height / 2) camera_pos.y = gs.screen_height / 2;
  if (camera_pos.x < gs.screen_width / 2) camera_pos.x = gs.screen_width / 2;
  ctx.translate(-camera_pos.x + gs.screen_width / 2, -camera_pos.y + gs.screen_height / 2);


  // Robo
	draw_robo(gs.robo, ctx);

  // Cannon
  ctx.fillStyle = "grey";
  draw_rect(gs.cannon.pos.x, gs.cannon.pos.y, 50, 150, gs.cannon.angle, 25, 125, ctx);


  // Obstacles
  for (const [slice_idx, slice] of Object.entries(gs.slices)) {
    
    // Zappers
    for (const zapper of slice.zappers) { draw_zapper(zapper, ctx); }
  }


  // Ground
  ctx.fillStyle = "green";
  draw_rect(gs.robo.pos.x - gs.screen_width, 30, gs.screen_width * 2, 30, 0, 0, 0, ctx);



  // Zappers

  ctx.restore();

  // UI
  ctx.fillStyle = "black";
  ctx.fillText(`Distance ${gs.distance}`, 0, 12)

  // Debug info
  if (display_debug) {
    ctx.fillStyle = "red";
    ctx.fillText(`Robo Pos: ${gs.robo.pos}`, 0, 50)
    ctx.fillText(`Robo Velocity: ${gs.robo.vel.x}, ${gs.robo.vel.y}`, 0, 65)

  }

}
