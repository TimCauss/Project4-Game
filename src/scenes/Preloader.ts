import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    //Loading tileset and Tilemap--------------------------------------
    this.load.image(TextureKeys.Tiles, "./public/images/tilemap.png");
    this.load.tilemapTiledJSON(MapKeys.Level1, "./public/map/dungeon01.json");

    //Loading Female Hero Spritesheet----------------------------------
    this.load.atlas(
      TextureKeys.FemaleHero,
      "./public/images/HeroFemaleSprite.png",
      "./public/images/HeroFemaleSprite.json"
    );
  }

  create() {


    //Launching Scene:--------------------------------------------------
    this.scene.start(SceneKeys.Game);
  }
}
