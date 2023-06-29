import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import UIBarScene from "./game/UIBarScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 400,
  height: 300,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Preloader, Game, UIBarScene],
  scale: {
    zoom: 2,
  },
};

export default new Phaser.Game(config);
