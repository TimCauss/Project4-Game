import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";

// anims import Start---------------------------------
import { createLizardAnims } from "../anims/EnemyAnims";
import { createHeroAnims } from "../anims/HeroAnims";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    //Loading tileset and Tilemap--------------------------------------
    this.load.image(TextureKeys.Tiles, "./public/images/tilemap.png");
    this.load.tilemapTiledJSON(MapKeys.Level1, "./public/map/dungeon01.json");

    //Loading Weapons--------------------------------------------------
    this.load.image(TextureKeys.Arrow, "./public/images/weapons/weapon_arrow.png");

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
    //Lizard anims call:
    createLizardAnims(this.anims);
    createHeroAnims(this.anims);

    //Launching Scene:--------------------------------------------------
    this.scene.start(SceneKeys.Game);
  }
}
