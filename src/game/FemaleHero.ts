import Phaser from "phaser";

import HeroAnimsKeys from "../consts/HeroAnimsKeys";
import PowerController from "./PowerController";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      fhero(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): FemaleHero;
    }
  }
}

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD,
}

export default class FemaleHero extends Phaser.Physics.Arcade.Sprite implements PowerController {


  private healthState = HealthState.IDLE;
  private damageTime = 0;

  //Starting STATS
  private _health = 100;
  private power = 100;
  private powerMax = 100;

  private cooldown = 0;



  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    //
    this.anims.play(HeroAnimsKeys.fHeroIdleDown);

    //Creating Physics
    scene.physics.add.existing(this);

    //Adjusting physics body (hitbox)size, color and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.debugBodyColor = 0x3cda15;
    body.setSize(13, this.height * 0.4);
    body.setOffset(this.width * 0.29, this.height * 0.45);


    //Hero Main  CoolDown:
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.cooldown > 0) {
          this.cooldown -= 0.5;
        } else {
          this.cooldown = 0;
        }
      },
    });
  }

  handleDamage(dir: Phaser.Math.Vector2) {
    if (this.healthState === HealthState.DAMAGE) {
      return;
    }
    if (this.getHealth() <= 0) {
      this.healthState = HealthState.DEAD;
      this.anims.play(HeroAnimsKeys.fHeroFaint, true);
      this.setVelocity(0, 0);
    } else {
      this.setVelocity(dir.x, dir.y)
      this.setTint(0xf00000)
      this.healthState = HealthState.DAMAGE;
      this.damageTime = 0;
    }
  }

  preUpdate(t: number, dt: number) {

    super.preUpdate(t, dt);

    switch (this.healthState) {
      case HealthState.IDLE:
        break;
      case HealthState.DAMAGE:
        this.damageTime += dt;
        if (this.damageTime >= 250) {
          this.healthState = HealthState.IDLE;
          this.setTint(0xffffff);
          this.damageTime = 0;
        }
        break;
      case HealthState.DEAD:
        this.setTint(0xbbbbbb);
        break;

    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

    if (this.healthState === HealthState.DAMAGE
      || this.healthState === HealthState.DEAD) {
      return;
    }

    //Cooldown 
    if (this.getPower() === 0) {
      this.cooldown = 1;
    }
    //KEYBOARD INPUT START:--------------------------------------
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;
    const powerSprintUsage = 0.005;



    if (!cursors) {
      return;
    }

    const heroBody = this.body as Phaser.Physics.Arcade.Body;

    //LEFT(Walk & Run):
    if (cursors.left?.isDown) {
      //Return sprite:
      this.scaleX = -1;
      heroBody.setOffset(this.width * 0.70, this.height * 0.45);
      if (cursors.shift?.isDown && this.getPower() > 0 && this.cooldown === 0) {
        this.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.removePowerPercent(powerSprintUsage);
        this.setVelocity(-runSpeed, 0);
      } else {
        //Launch animation
        this.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        //Set velocity to left
        this.setVelocityX(-walkSpeed);
      }
      //RIGHT
    } else if (cursors.right?.isDown) {
      this.scaleX = 1;
      heroBody.setOffset(this.width * 0.29, this.height * 0.45);
      if (cursors.shift?.isDown && this.getPower() > 0 && this.cooldown === 0) {
        this.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        this.removePowerPercent(powerSprintUsage);
        this.setVelocity(runSpeed, 0);
      } else {
        this.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        this.setVelocityX(walkSpeed);
      }
      //UP
    } else if (cursors.up?.isDown) {
      this.scaleX = 1;
      heroBody.setOffset(this.width * 0.30, this.height * 0.45);
      if (cursors.shift?.isDown && this.getPower() > 0 && this.cooldown === 0) {
        this.anims.play(HeroAnimsKeys.fHeroRunUp, true);
        this.removePowerPercent(powerSprintUsage);
        this.setVelocity(0, -runSpeed);
      } else {
        this.anims.play(HeroAnimsKeys.fHeroWalkUp, true);
        this.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (cursors.down?.isDown) {
      this.scaleX = 1;
      heroBody.setOffset(this.width * 0.30, this.height * 0.45);
      if (cursors.shift?.isDown && this.getPower() > 0 && this.cooldown === 0) {
        this.anims.play(HeroAnimsKeys.fHeroRunDown, true);
        this.setVelocity(0, runSpeed);
        this.removePowerPercent(powerSprintUsage);
      } else {
        this.setVelocityY(walkSpeed);
        this.anims.play(HeroAnimsKeys.fHeroWalkDown, true);
      }
    } else {
      if (!this.anims.currentAnim) return;
      const parts = this.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      this.anims.play(parts.join("-"));
      this.setVelocity(0, 0);
    }
    //KEYBOARD INPUT END-----------------------------------------
  }



  //Power Methods :
  public getPower() {
    return this.power;
  }
  public removePower(power: number): void {
    this.power -= power;
  }
  public addPower(power: number): void {
    this.power += power;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  public setPower(power: number): void {
    this.power = power;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  public getPowerMax() {
    return this.powerMax;
  }
  public setPowerMax(powerMax: number): void {
    this.powerMax = powerMax;
  }
  public getPowerPercent(): number {
    return (this.power / this.powerMax) * 100;
  }
  public addPowerPercent(power: number): void {
    this.power += power * this.powerMax;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  public removePowerPercent(power: number): void {
    this.power -= power * this.powerMax;
  }

  public startCooldown(seconde: number): void {
    this.cooldown = seconde;
  }

  public getHealth() {
    return this._health;
  }

  public setHealth(value: number): void {
    this._health = value;
  }

  public removeHealth(value: number): void {
    this._health -= value;
  }

  public addHealth(value: number): void {
    this._health += value;
  }

  public addHealthPercent(value: number): void {
    this._health += (value * this._health);
  }
}

Phaser.GameObjects.GameObjectFactory.register("fhero", function (
  this: Phaser.GameObjects.GameObjectFactory,
  x: number,
  y: number,
  texture: string,
  frame?: string | number
) {
  const sprite = new FemaleHero(this.scene, x, y, texture, frame);

  this.displayList.add(sprite);
  this.updateList.add(sprite);

  this.scene.physics.world.enableBody(
    sprite,
    Phaser.Physics.Arcade.DYNAMIC_BODY
  );

  return sprite;
});
