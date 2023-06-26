import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    //Loading tileset and Tilemap----------------------------------
    this.load.image(TextureKeys.Tiles, "./public/images/tilemap.png");
    this.load.tilemapTiledJSON(MapKeys.Level1, "./public/map/dungeon01.json");
  }

  create() {
    this.scene.start(SceneKeys.Game);
  }
}
