import { world_to_screen, deg_to_rad } from "./helperFns.js"
const Vec2 = Vector

export const draw_rect = (world_x, world_y, width, height, rotation, anchorX, anchorY, ctx) => {

  const screen_pos = world_to_screen(new Vec2(world_x, world_y))
  const x = screen_pos.x
  const y = screen_pos.y

  ctx.save()

  ctx.translate(x, y);
  ctx.rotate(deg_to_rad(rotation))
  ctx.translate(-x, -y);

  //ctx.translate(-anchorX, -anchorY)

  ctx.translate(-anchorX, -anchorY)
  ctx.fillRect(x, y, width, height);
  ctx.restore();

  // Debug: draw anchor point
  // ctx.save();
  // ctx.fillStyle = "red";
  // ctx.beginPath();
  // ctx.arc(x, y, 2, 0, Math.PI * 2)
  // //ctx.closePath();
  // ctx.fill();
  // ctx.restore();

}

export const draw_circle = (world_x, world_y, radius, rotation, anchorX, anchorY, ctx) => {
  const screen_pos = world_to_screen(new Vec2(world_x, world_y))
  const x = screen_pos.x
  const y = screen_pos.y

  ctx.save()


  ctx.translate(x, y);
  ctx.rotate(deg_to_rad(rotation))
  ctx.translate(-x, -y);

  //ctx.translate(-anchorX, -anchorY)

  ctx.translate(-anchorX, -anchorY)
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Debug: draw anchor point
	/*
  ctx.save();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2)
  //ctx.closePath();
  ctx.fill();
  ctx.restore();
	*/
}
