import Phaser from "phaser";



// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import SceneKeys from "../consts/SceneKeys";
import HeroAnimsKeys from "../consts/HeroAnimsKeys";
import LizardGreen from "../game/LizardGreen";
// enum import end------------------------------------

import "../game/FemaleHero";
import eventsCenter from "./EventsCenter";

export default class Game extends Phaser.Scene {


  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;
  private hero!: Phaser.Physics.Arcade.Sprite;

  private hit = 0

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  create() {

    // Creating tilemap instance using .make.timeMap() method
    const map = this.make.tilemap({ key: MapKeys.Level1 });
    const tileset = map.addTilesetImage("tyniDungeon", TextureKeys.Tiles);

    // Creating layers using .createLayer() method
    map.createLayer("Ground", tileset as Phaser.Tilemaps.Tileset);
    this.wallsLayer = map.createLayer("Walls", tileset as Phaser.Tilemaps.Tileset)!;
    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Debugging Method START------------------------------------
    this.collisonDebug(false);
    // Debugging Method END--------------------------------------

    //Adding HERO:-----------------------------------------------
    this.hero = this.add.fhero(231, 48, HeroAnimsKeys.fHeroIdleDown, undefined);

    console.log(this.hero);

    //Adding GREEN LIZARDS :-------------------------------------
    const lizards = this.physics.add.group({
      classType: LizardGreen,
    });
    let i;
    for (i = 0; i < 1; ++i) {
      lizards.get(Phaser.Math.Between(10, 300), Phaser.Math.Between(10, 300));
    }

    //Regen PowerBar---------------------------------------------
    const timerPower = this.time.addEvent({
      delay: 10,
      loop: true,
      callback: () => {
        if (this.hero.getPower() < 100) {
          this.hero.addPowerPercent(0.005);
          this.updatePower()
        }
      },
    });

    //Regen HealthBar---------------------------------------------
    const timerHealth = this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.hero.getHealth() < 100) {
          this.hero.addHealthPercent(0.001);
          this.updateHealth()
        } 
        if (this.hero.getHealth() > 100) {
          this.hero.setHealth(100)
          this.updateHealth();
        } 
        if (this.hero.getHealth() <= 0) {
          this.hero.setHealth(0)
          this.updateHealth();
        }
      },
    });


    // Collider Settings-----------------------------------------
    this.physics.add.collider(lizards, this.wallsLayer);
    this.physics.add.collider(this.hero, this.wallsLayer);
    this.physics.add.collider(this.hero, lizards, this.handleHeroLizardCollision, undefined, this);

    //Cameras Settings-------------------------------------------
    this.cameras.main.startFollow(this.hero, true);


    this.scene.run(SceneKeys.UIBarScene);
  }

  private updatePower() {
    eventsCenter.emit('updatePower', this.hero.getPower());
  }

  private updateHealth() {
    eventsCenter.emit('updateHealth', this.hero.getHealth());
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
    this.hero.removeHealth(lizard.damage)
  }


  update() {

    //Cooldown 
    if (this.hero.getPower() === 0) {
      this.hero.cooldown = 1;
    }

    //KEYBOARD INPUT START:--------------------------------------
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;
    const powerSprintUsage = 0.005;

    //Scale setValur to this.hero.power
    // this.setValue(this.powerBar, this.hero.power, 100);

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
      if (this.cursors.shift?.isDown && this.hero.getPower() > 0 && this.hero.cooldown === 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.removePowerPercent(powerSprintUsage);
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
      if (this.cursors.shift?.isDown && this.hero.getPower() > 0 && this.hero.cooldown === 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.hero.removePowerPercent(powerSprintUsage);
        this.hero.setVelocity(runSpeed, 0);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        this.hero.setVelocityX(walkSpeed);
      }
      //UP
    } else if (this.cursors.up?.isDown) {
      this.hero.scaleX = 1;
      heroBody.setOffset(this.hero.width * 0.22, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.getPower() > 0 && this.hero.cooldown === 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunUp, true);
        this.hero.removePowerPercent(powerSprintUsage);
        this.hero.setVelocity(0, -runSpeed);
      } else {
        this.hero.anims.play(HeroAnimsKeys.fHeroWalkUp, true);
        this.hero.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (this.cursors.down?.isDown) {
      this.hero.scaleX = 1;
      heroBody.setOffset(this.hero.width * 0.22, this.hero.height * 0.22);
      if (this.cursors.shift?.isDown && this.hero.getPower() > 0 && this.hero.cooldown === 0) {
        this.hero.anims.play(HeroAnimsKeys.fHeroRunDown, true);
        this.hero.removePowerPercent(powerSprintUsage);
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
}