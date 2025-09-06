import { Entities, SLICE_WIDTH } from "../enums.js";
import { rand } from "../helperFns.js";
import { draw_rect } from "../drawFns.js";
import { rect_rect } from "../collisions.js";
import { change_state } from "../game.js";
import { GameStates } from "../enums.js";

const Vec2 = Vector

export const spawn_magnet = (slice_x) => {
	return {
		type: Entities.MAGNET,
		pos: new Vec2(rand(slice_x, slice_x + SLICE_WIDTH), 40),
		width: 40,
		height: 40,
	}
}

export const draw_magnet = (magnet, ctx) => {
	ctx.fillStyle = "red";
	draw_rect(magnet.pos.x, magnet.pos.y, magnet.width, magnet.height, 0, 15, 25, ctx);
}

export const collisions_magnet = (robo_rect, magnets) => {
	const gs = window.gamestate;

	for (const magnet of magnets) {
		if (rect_rect(robo_rect.x, robo_rect.y, robo_rect.w, robo_rect.h, magnet.pos.x, magnet.pos.y, magnet.width, magnet.height)) {
			if (gs.state !== GameStates.LOSE) {
				gs.robo.pos.x = magnet.pos.x + magnet.width / 2
				gs.robo.pos.y = magnet.pos.y + magnet.height
				change_state(GameStates.LOSE)
			}
			break;
		}
	}
}
