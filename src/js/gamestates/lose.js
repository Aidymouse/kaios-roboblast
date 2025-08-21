import { GameStates } from "../enums.js";
import { change_state } from "../game.js";

export const update = (dt) => {
  const gs = window.gamestate;
  gs.state = "";

  setTimeout(() => {
    gs.camera.pos.x = gs.screen_width / 2;
    gs.camera.pos.y = gs.screen_height / 2;
    change_state(GameStates.CANNON);
  }, 750)


}
