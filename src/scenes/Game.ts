import Phaser from "phaser";

// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
// enum import end-------------------------------------------

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    this.add.image(100, 100, TextureKeys.Tiles);
  }
}
