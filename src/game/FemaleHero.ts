import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

//Preparing First Hero Class:
export default class FemaleHero extends Phaser.GameObjects.Container {
  private femaleHero: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create FemaleHero Sprite:
    this.femaleHero = scene.add
      .sprite(232, 38, TextureKeys.FemaleHero)
      .setOrigin(0.5, 1)

    //Add the femaleHero as a child of Container
    

  }
}
