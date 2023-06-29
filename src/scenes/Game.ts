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
  private powerBar!: Phaser.GameObjects.Graphics;

  private hit = 0

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  create() {
    //store the width and height of the game screen:


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
    this.powerBar = this.makeBar(0, 0, 0xEE9933);
    this.setValue(this.powerBar, 100);

    //Adding GREEN LIZARDS :-------------------------------------
    const lizards = this.physics.add.group({
      classType: LizardGreen,
    });

    let i;
    for (i = 0; i < 5; ++i) {
      lizards.get(Phaser.Math.Between(10, 300), Phaser.Math.Between(10, 300));
    }

    this.time.addEvent({
      delay: 1,
      loop: true,
      callback: () => {
        if (this.hero.power < 100) {
          this.hero.power += 0.1;
        }
      },
    });

    console.log(this.hero);

    // Collider Settings-----------------------------------------
    this.physics.add.collider(lizards, this.wallsLayer);
    this.physics.add.collider(this.hero, this.wallsLayer);
    this.physics.add.collider(this.hero, lizards, this.handleHeroLizardCollision, undefined, this);

    //Cameras Settings-------------------------------------------
    // this.cameras.main.startFollow(hero, true);


  }

  private handleHeroLizardCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const lizard = obj2 as LizardGreen;

    const dx = this.hero.x - lizard.x;
    const dy = this.hero.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(250);

    this.hero.setVelocity(dir.x, dir.y);
    this.hero.tint = 0xFF0000
    this.hit = 1
  }


  update() {
    //KEYBOARD INPUT START:--------------------------------------
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;

    //Scale setValur to this.hero.power
    this.setValue(this.powerBar, this.hero.power, 100);

    if (this.hit > 0) {
      ++this.hit
      if (this.hit > 5) {
        this.hit = 0
        this.hero.clearTint()
      }
      return
    }

    if (!this.cursors) {
      return;
    }

    const heroBody = this.hero.body as Phaser.Physics.Arcade.Body;

    //LEFT(Walk & Run):
    if (this.cursors.left?.isDown) {
      //Return sprite:
      this.hero.scaleX = -1;
      heroBody.setOffset(23, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.power > 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.power -= 0.5;
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
      heroBody.setOffset(this.hero.width * 0.22, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.power > 10) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.power -= 0.5;
        this.hero.setVelocity(runSpeed, 0);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        this.hero.setVelocityX(walkSpeed);
      }
      //UP
    } else if (this.cursors.up?.isDown) {
      this.hero.scaleX = 1;
      heroBody.setOffset(this.hero.width * 0.22, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.power > 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunUp, true);
        this.hero.power -= 0.5;
        this.hero.setVelocity(0, -runSpeed);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkUp, true);
        this.hero.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (this.cursors.down?.isDown) {
      this.hero.scaleX = 1;
      heroBody.setOffset(this.hero.width * 0.22, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.power > 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunDown, true);
        this.hero.power -= 0.5;
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
    //KEYBOARD INPUT END-----------------------------------------
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

  private makeBar(x: number, y: number, color: number) {
    //draw the bar
    let barBg = this.add.graphics();
    let bar = this.add.graphics();


    //color the bar
    bar.fillStyle(color, 1);
    barBg.fillStyle(0x000000, 1);

    //fill the bar with a rectangle
    bar.fillRect(0, 0, 100, 5);
    barBg.fillRect(0, 0, 100, 5);

    //position the bar
    barBg.x = x;
    bar.x = x;

    barBg.y = y;
    bar.y = y;

    //return the bar
    return bar;
  }

  private setValue(bar: Phaser.GameObjects.Graphics, percentage: number) {
    //scale the bar
    bar.scaleX = percentage / 100;
  }
}
