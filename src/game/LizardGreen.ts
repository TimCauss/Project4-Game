import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import EnemyAnimsKeys from "../consts/EnemyAnimsKeys";

export default class LizardGreen extends Phaser.GameObjects.Container {
  private greenLizard: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create GreenLizard Sprite:
    this.greenLizard = scene.add
      .sprite(0, 0, TextureKeys.LizardGreen)
      .setOrigin(0.5, 1);

    this.add(this.greenLizard);

    this.greenLizard.anims.play(EnemyAnimsKeys.LizardGreenRun);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;

    body.debugBodyColor = 0xff0000;
    body.setSize(this.greenLizard.width, this.greenLizard.height * 0.8);
    body.setOffset(
      -this.greenLizard.width * 0.45,
      -this.greenLizard.height * 0.78
    );
  }
}
