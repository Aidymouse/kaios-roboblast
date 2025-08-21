const Vec2 = Vector

// Simple degree -> radian converter
const DEG_TO_RAD = Math.PI / 180
export const deg_to_rad = (deg) => DEG_TO_RAD * deg;

// World <-> Screen translations
export const world_to_screen = (world_pos) => new Vec2(world_pos.x, (-world_pos.y) + window.gamestate.screen_height);
export const screen_to_world = (screen_pos) => new Vec2(screen_pos.x, window.gamestate.screen_height - screen_pos.y)

// Random Numbers (both inclusive)
export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
