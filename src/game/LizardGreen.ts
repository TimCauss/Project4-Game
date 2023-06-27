import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import EnemyAnimsKeys from "../consts/EnemyAnimsKeys";

export default class LizardGreen extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
    super(scene, x, y, texture, frame);

    //Create the class & adding it an animation
    scene.physics.add.existing(this);
    this.anims.play(EnemyAnimsKeys.LizardGreenIdle);

    //Physics
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.debugBodyColor = 0xff0000;
    body.setSize(this.width, this.height * 0.8);
    body.setOffset(
      this.width*0.05,
      this.height*0.25
    );
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);
  }
}
