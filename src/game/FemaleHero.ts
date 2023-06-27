import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

//Preparing First Hero Class:
export default class FemaleHero extends Phaser.GameObjects.Container {
    
  //Private declarations:
  private femaleHero: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create FemaleHero Sprite:
    this.femaleHero = scene.add
      .sprite(0, 0, TextureKeys.FemaleHero)
      .setOrigin(0, 0)
      .play(AnimationKeys.fHeroIdleDown);

    //Add the femaleHero as a child of Container
    this.add(this.femaleHero);

    //Creating Physics
    scene.physics.add.existing(this);

    //Adjusting physics body (hitbox)size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(17, this.femaleHero.height * 0.5);
    body.setOffset(8, 12);
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;
  }
}
