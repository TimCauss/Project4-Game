import Phaser from "phaser";

import HeroAnimsKeys from "../consts/HeroAnimsKeys";

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
export default class FemaleHero extends Phaser.Physics.Arcade.Sprite {
  //Private declarations:

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    //
    this.anims.play(HeroAnimsKeys.fHeroRunSide);

    //Creating Physics
    scene.physics.add.existing(this);

    //Adjusting physics body (hitbox)size, color and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.debugBodyColor = 0x3cda15;
    body.setSize(17, this.height * 0.7);
    body.setOffset(this.width*0.22, this.height*0.22);
    //TODO Change HitBox Position

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
