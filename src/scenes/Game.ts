import Phaser from "phaser";

// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import SceneKeys from "../consts/SceneKeys";
import FemaleHero from "../game/FemaleHero";
// enum import end-------------------------------------------

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;

  create() {
    //store the width and height of the game screen:
    const width = this.scale.width;
    const height = this.scale.height;

    // Creating tilemap instance using .make.timeMap() method
    const map = this.make.tilemap({ key: MapKeys.Level1 });
    const tileset = map.addTilesetImage("tyniDungeon", TextureKeys.Tiles);

    // Creating layers using .createLayer() method
    map.createLayer("Ground", tileset);
    this.wallsLayer = map.createLayer("Walls", tileset);

    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Debugging Method START------------------------------------
    this.collisonDebug(false);
    // Debugging Method END--------------------------------------

    //Adding HERO:-----------------------------------------------
    const hero = new FemaleHero(this, 231, 48);

    this.add.existing(hero);
    // Collider Settings-----------------------------------------
    this.physics.add.collider(hero, this.wallsLayer);

    //Cameras Settings-------------------------------------------
    this.cameras.main.startFollow(hero);
    this.cameras.main.setBounds(0, 0, width, height);
  }

  // Debugging Collision Method----------------------------------
  private collisonDebug(enabled: boolean) {
    if (enabled) {
      const debugGraphics = this.add.graphics().setAlpha(0.7);
      this.wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    }
  }
}
