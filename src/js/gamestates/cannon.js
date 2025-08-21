
export const update = (dt) => {
  const gs = window.gamestate;

  // Cannon angling
  if (keysDown.left) {
    gs.cannon.angle -= 1;
  } else if (keysDown.right) {
    gs.cannon.angle += 1;
  }

  if (gs.cannon.angle < 5) gs.cannon.angle = 5;
  if (gs.cannon.angle > 90) gs.cannon.angle = 90;
}
