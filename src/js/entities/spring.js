import { rand } from '../helperFns.js'
import { Entities, SLICE_WIDTH } from "../enums.js"
import { draw_rect } from "../drawFns.js";
import { rect_rect } from '../collisions.js';

const Vec2 = Vector

export const spawn_spring = (slice_x) => {

	return {
		type: Entities.SPRING,
		pos: new Vec2(rand(slice_x, slice_x + SLICE_WIDTH), 50),
		width: 50,
		height: 50,

	}

}

export const draw_spring = (spring, ctx) => {
	ctx.fillStyle = "lightgreen";
	draw_rect(spring.pos.x, spring.pos.y, spring.width, spring.height, 0, 15, 25, ctx);
}

export const collisions_spring = (robo_rect, springs) => {
	const gs = window.gamestate;

	for (const spring of springs) {
		if (rect_rect(robo_rect.x, robo_rect.y, robo_rect.w, robo_rect.h, spring.pos.x, spring.pos.y, spring.width, spring.height)) {
			if (gs.robo.vel.y < 0) {
				gs.robo.vel.y = -gs.robo.vel.y;
			}
			gs.robo.vel.y += 500;
			break;
		}
	}
}
