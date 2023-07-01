import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import UIBarScene from "./game/UIBarScene";



const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game, UIBarScene],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width:960,
    height:640,
  },
};

export default new Phaser.Game(config);
