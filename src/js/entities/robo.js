import { draw_circle } from "../drawFns.js"

export const draw_robo = (robo, ctx) => {

	if (robo.invincibility_timer > 0) {
		ctx.fillStyle = "lightgreen";
	} else {
		ctx.fillStyle = "green";
	}
	
  //ctx.fillRect(gs.robo.pos.x, gs.robo.pos.y, 64, 64);
  //draw_rect(gs.robo.pos.x, gs.robo.pos.y, 64, 64, 0, 32, 32, ctx);
  draw_circle(robo.pos.x, robo.pos.y, robo.radius, 0, 0, 0, ctx);
}
