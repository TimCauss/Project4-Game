import Phaser from "phaser";

// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import SceneKeys from "../consts/SceneKeys";
// enum import end-------------------------------------------

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    
    // Creating tilemap instance using .make.timeMap() method
    const map = this.make.tilemap({ key: MapKeys.Level1 });
    const tileset = map.addTilesetImage("tyniDungeon", TextureKeys.Tiles);

    // Creating layers using .createLayer() method
    map.createLayer("Ground", tileset);
    map.createLayer("Walls", tileset);
  }
}
