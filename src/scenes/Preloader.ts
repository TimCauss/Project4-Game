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
    //FemaleHero Animation IDLE:---------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroIdle,
      //generate frame:
      frames: [
        {
          key: TextureKeys.FemaleHero,
          frame: "idle.png",
        },
      ],
    });

    //FemaleHero Animation Walk Down:-----------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroWalkDown,
      //generate frames:
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "walk-down-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    //Launching Scene:--------------------------------------------------
    this.scene.start(SceneKeys.Game);
  }
}
