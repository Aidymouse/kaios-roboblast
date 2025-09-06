import { rand } from '../helperFns.js'
import { SLICE_WIDTH } from "../enums.js";
import { draw_rect } from "../drawFns.js";

const Vec2 = Vector

/**
 * @returns A Zapper
 */
export const spawn_zapper = (slice_x) => {
	return {
      pos: new Vec2(rand(slice_x, slice_x + SLICE_WIDTH), rand(30, 1500)),
      width: 10,
      height: 50,
    }
}

export const draw_zapper = (zapper, ctx) => {
      ctx.fillStyle = "lightblue";
      draw_rect(zapper.pos.x, zapper.pos.y, zapper.width, zapper.height, 0, 15, 25, ctx);
}
