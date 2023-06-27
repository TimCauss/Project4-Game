import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class LizardGreen extends Phaser.GameObjects.Container {
  private greenLizard: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create GreenLizard Sprite:
    this.greenLizard = scene.add
      .sprite(0, 0, TextureKeys.LizardGreen)
      .setOrigin(0.5, 1);

    this.add(this.greenLizard);
  }
}
