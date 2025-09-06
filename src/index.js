
import { handle_key, init } from './js/game.js'

window.keysDown = {
  left: false,
  right: false,
}

document.addEventListener("keydown", event => {
	const gs = window.gamestate;

  handle_key(event.key);

  switch (event.key) {
    // case "Enter":
    // //return Softkey.Enter(event);
    // case "ArrowDown":
    // //return Navigation.Down(event);
    // case "ArrowUp":
    //return Navigation.Up(event);
    case "ArrowLeft": {
      keysDown.left = true;
      return;
    }
    case "ArrowRight": {
      keysDown.right = true;
      return;
    }
    // case "SoftRight":
    //   return Softkey.SoftRight(event);
    case "s": {
			console.log(gs.slices)
			return;
		}
    default:
      return;
  }

});

document.addEventListener("keyup", event => {
  switch (event.key) {
    case "ArrowLeft": {
      keysDown.left = false;
      return;
    }
    case "ArrowRight": {
      keysDown.right = false;
      return;
    }
    default:
      return;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  init();

})
