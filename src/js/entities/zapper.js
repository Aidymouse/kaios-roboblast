import { rand } from '../helperFns.js'
import { Entities, SLICE_WIDTH } from "../enums.js";
import { draw_rect } from "../drawFns.js";

const Vec2 = Vector

/**
 * @returns A Zapper
 */
export const spawn_zapper = (slice_x) => {
	return {
		type: Entities.ZAPPER,
		pos: new Vec2(rand(slice_x, slice_x + SLICE_WIDTH), rand(30, 1500)),
		width: 20,
		height: 100,
	}
}

export const draw_zapper = (zapper, ctx) => {
	ctx.fillStyle = "lightblue";
	draw_rect(zapper.pos.x, zapper.pos.y, zapper.width, zapper.height, 0, 15, 25, ctx);
}

export const collisions_zapper = (robo_rect, zappers) => {
}
