import { GameStates } from "../enums.js"
import { change_state } from "../game.js";
import { rand } from "../helperFns.js";
import { SLICE_WIDTH } from "../enums.js";
import { rect_rect } from "../collisions.js";
import { spawn_zapper } from "../entities/zapper.js"


const Vec2 = Vector



export const update = (dt) => {
  const gs = window.gamestate;

  gs.robo.pos = gs.robo.pos.add(gs.robo.vel.mulScalar(dt))

  if (gs.state === GameStates.SHOOT) {
    const canvas = document.getElementById("main-canvas")
    const canvas_rect = canvas.getBoundingClientRect();
    gs.camera.pos.x = gs.robo.pos.x
    gs.camera.pos.y = gs.robo.pos.y
  }

  // Gravity
  gs.robo.vel.y -= (gs.gravity * dt) / (gs.robo.vel.y > 100 ? 1 : 0.6)

  // Bounce TODO: make this collision system
  if (gs.robo.pos.y - gs.robo.radius <= 30 && gs.robo.vel.y < 0) {
		gs.robo.pos.y = 30 + gs.robo.radius
		gs.robo.vel.x = gs.robo.vel.x - 200; // Decelerate

    gs.robo.vel.y = -(gs.robo.vel.y * 0.6)
		if (gs.robo.vel.y < 100) gs.robo.vel.y = 0
    //if (gs.robo.vel.y < 120) {
    if (gs.robo.vel.x <= 0) {
      console.log("Stop")

      change_state(GameStates.LOSE)
    }
  } 

	if (gs.robo.vel.x < 0) { gs.robo.vel.x = 0 }

  // Handle collisions
  gs.robo.invincibility_timer -= dt;

  if (gs.robo.invincibility_timer <= 0) {
    collision_block: { // Needed this or break wasn't working idk why
      const robo_rect = { 
				x: gs.robo.pos.x - (gs.robo.radius * 1.5) / 2,
 				y: gs.robo.pos.y + (gs.robo.radius * 1.5) / 2,
 				w: gs.robo.radius * 1.5,
 				h: gs.robo.radius * 1.5 
			}

      for (const [slice_idx, slice] of Object.entries(gs.slices)) {

        for (const zapper of slice.zappers) {

          if (rect_rect(robo_rect.x, robo_rect.y, robo_rect.w, robo_rect.h, zapper.pos.x, zapper.pos.y, zapper.width, zapper.height)) {
            gs.robo.vel.x *= 0.9;
            gs.robo.invincibility_timer = 2;
            break collision_block;
          }

        }
      }
    }


  }

  // Distance
  gs.distance = Math.floor(gs.robo.pos.x / 100);

  // Spawn new slices if required
  const inhabited_slice = (gs.robo.pos.x - (gs.robo.pos.x % SLICE_WIDTH)) / SLICE_WIDTH
	for (let i=gs.latest_slice_seen; i<inhabited_slice+3; i++) {
		if (!gs.slices[`${i}`] && i !== 0) {
				spawn_slice(i)
				gs.latest_slice_seen += 1
		}
	}

	// Despawn old slices
	for (const slice_id of Object.keys(gs.slices)) {
		if (parseInt(slice_id) < inhabited_slice - 3) {
			delete gs.slices[slice_id]
		}
	}

	
}

// Template
const BLANK_SLICE = {
  zappers: [],
}

export const spawn_slice = (slice_num) => {
  const gs = window.gamestate

  if (gs.slices[slice_num]) {
    console.warn(`Slice ${slice_num} already exists.`)
    return
  }

  console.log("Spwaning slice", slice_num)
  const new_slice = BLANK_SLICE

  const slice_x = slice_num * SLICE_WIDTH

  const num_ents = rand(0, 30) // TODO: number should go up with distance
  // At the start, the spread should be mostly down the bottom. Further on the spread should be more even, and more things should spawn.
  for (let i = 0; i < num_ents; i++) {

    // TODO: select type of thing randomly
    new_slice.zappers.push(spawn_zapper(slice_x))

  }

  gs.slices[slice_num] = new_slice
}

export const despawn_slice = () => {
}
