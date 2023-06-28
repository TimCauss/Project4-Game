import Phaser from "phaser";

// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import SceneKeys from "../consts/SceneKeys";
import HeroAnimsKeys from "../consts/HeroAnimsKeys";
import LizardGreen from "../game/LizardGreen";
// enum import end------------------------------------

import "../game/FemaleHero";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;
  private hero!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  create() {
    //store the width and height of the game screen:
    const width = this.scale.width;
    const height = this.scale.height;

    // Creating tilemap instance using .make.timeMap() method
    const map = this.make.tilemap({ key: MapKeys.Level1 });
    const tileset = map.addTilesetImage("tyniDungeon", TextureKeys.Tiles);

    // Creating layers using .createLayer() method

    map.createLayer("Ground", tileset as Phaser.Tilemaps.Tileset);

    this.wallsLayer = map.createLayer(
      "Walls",
      tileset as Phaser.Tilemaps.Tileset
    )!;

    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Debugging Method START------------------------------------
    this.collisonDebug(false);
    // Debugging Method END--------------------------------------

    //Adding HERO:-----------------------------------------------
    this.hero = this.add.fhero(231, 48, HeroAnimsKeys.fHeroIdleDown);

    //Adding GREEN LIZARDS :--------------------------------------
    const lizards = this.physics.add.group({
      classType: LizardGreen,
    });
    lizards.get(width * 0.5, height * 0.5, "lizard");

    // Collider Settings-----------------------------------------
    this.physics.add.collider(lizards, this.wallsLayer);
    this.physics.add.collider(this.hero, this.wallsLayer);
    this.physics.add.collider(this.hero, lizards, this.handleHeroLizardCollision, undefined, this);

    //Cameras Settings-------------------------------------------
    // this.cameras.main.startFollow(hero, true);
  }

  update() {
    //KEYBOARD INPUT START:----------------------------------------------
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;

    if (!this.cursors) {
      return;
    }

    //LEFT(Walk & Run):
    if (this.cursors.left?.isDown) {
      //Return sprite:
      this.hero.scaleX = -1;
      if (this.cursors.shift?.isDown) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.setVelocity(-runSpeed, 0);
      } else {
        //Launch animation
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        //Set velocity to left
        this.hero.setVelocityX(-walkSpeed);
      }
      //RIGHT
    } else if (this.cursors.right?.isDown) {
      this.hero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.setVelocity(runSpeed, 0);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        this.hero.setVelocityX(walkSpeed);
      }
      //UP
    } else if (this.cursors.up?.isDown) {
      this.hero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunUp, true);
        this.hero.setVelocity(0, -runSpeed);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkUp, true);
        this.hero.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (this.cursors.down?.isDown) {
      this.hero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunDown, true);
        this.hero.setVelocity(0, runSpeed);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkDown, true);
        this.hero.setVelocityY(walkSpeed);
      }
    } else {
      if (!this.hero.anims.currentAnim) return;
      const parts = this.hero.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      this.hero.setVelocity(0, 0);
      this.hero.play(parts.join("-"));
    }
    //KEYBOARD INPUT END-----------------------------------------------
  }

  private handleHeroLizardCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const lizard = obj2 as LizardGreen;

    const dx = this.hero.x - lizard.x;
    const dy = (this.hero.y = lizard.y);

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    this.hero.setVelocity(dir.x, dir.y);
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
