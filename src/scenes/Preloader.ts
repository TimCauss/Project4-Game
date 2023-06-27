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

    this.load.atlas(
      TextureKeys.LizardGreen,
      "./public/images/enemies/lizard_green.png",
      "./public/images/enemies/lizard_green.json"
    );
  }

  create() {
    //FemaleHero Animation START---------------------------------------
    //IDLE DOWN:-------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroIdleDown,
      //generate frame:
      frames: [
        {
          key: TextureKeys.FemaleHero,
          frame: "idle.png",
        },
      ],
    });
    //IDLE UP:-------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroIdleUp,
      //generate frame:
      frames: [
        {
          key: TextureKeys.FemaleHero,
          frame: "walk-up-3.png",
        },
      ],
    });
    //IDLE SIDE:-------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroIdleSide,
      //generate frame:
      frames: [
        {
          key: TextureKeys.FemaleHero,
          frame: "walk-side-3.png",
        },
      ],
    });

    //WALK DOWN:-------------------------------------------------------
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
    //RUN DOWN:--------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroRunDown,
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "run-down-",
        suffix: "png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //WALK UP:---------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroWalkUp,
      //generate frames:
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "walk-up-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //RUN UP:---------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroRunUp,
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "run-up-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //WALK SIDE:-------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroWalkSide,
      //generate frames:
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "walk-side-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //RUN SIDE:---------------------------------------------------------
    this.anims.create({
      key: AnimationKeys.fHeroRunSide,
      frames: this.anims.generateFrameNames(TextureKeys.FemaleHero, {
        start: 1,
        end: 8,
        prefix: "run-side-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //FemaleHero Animations END-----------------------------------------

    //Launching Scene:--------------------------------------------------
    this.scene.start(SceneKeys.Game);
  }
}
