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

//Preparing First Hero Class:
export default class FemaleHero extends Phaser.Physics.Arcade.Sprite implements PowerController {

  //Private declarations:
  private power = 100;
  private powerMax = 100;

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
    body.setSize(17, this.height * 0.7);
    body.setOffset(this.width * 0.22, this.height * 0.22);


  }

  //Power Methods :
  getPower() {
    return this.power;
  }
  removePower(power: number): void {
    this.power -= power;
  }
  addPower(power: number): void {
    this.power += power;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  setPower(power: number): void {
    this.power = power;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  getPowerMax() {
    return this.powerMax;
  }
  setPowerMax(powerMax: number): void {
    this.powerMax = powerMax;
  }
  getPowerPercent(): number {
    return this.power / this.powerMax;
  }
  addPowerPercent(power: number): void {
    this.power += power * this.powerMax;
    if (this.power >= this.getPowerMax()) {
      this.power = this.getPowerMax();
    }
  }
  removePowerPercent(power: number): void {
    this.power -= power * this.powerMax;
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
