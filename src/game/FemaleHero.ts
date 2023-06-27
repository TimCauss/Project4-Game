import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

//Preparing First Hero Class:
export default class FemaleHero extends Phaser.GameObjects.Container {
  //Private declarations:
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private femaleHero: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Get CursorKeys Instance
    this.cursors = scene.input.keyboard.createCursorKeys();

    //Create FemaleHero Sprite:
    this.femaleHero = scene.add
      .sprite(0, 0, TextureKeys.FemaleHero)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.fHeroIdleDown);

    //Add the femaleHero as a child of Container
    this.add(this.femaleHero);

    //Creating Physics
    scene.physics.add.existing(this);

    //Adjusting physics body (hitbox)size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(17, this.femaleHero.height * 0.6);
    body.setOffset(-this.femaleHero.width * 0.25, -23);

    //setting collide with walls:
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    //KEYBOARD INPUT START:----------------------------------------------
    //
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;

    if (!this.cursors || !this.femaleHero) {
      return;
    }
    //LEFT(Walk & Run):
    if (this.cursors.left?.isDown) {
      //Return sprite:
      this.femaleHero.scaleX = -1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(AnimationKeys.fHeroRunSide, true);
        body.setVelocity(-runSpeed, 0);
      } else {
        //Launch animation
        this.femaleHero.anims.play(AnimationKeys.fHeroWalkSide, true);
        //Set velocity to left
        body.setVelocityX(-walkSpeed);
      }

      //RIGHT
    } else if (this.cursors.right?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(AnimationKeys.fHeroRunSide, true);
        body.setVelocity(runSpeed, 0);
      } else {
        //Launch animation
        this.femaleHero.anims.play(AnimationKeys.fHeroWalkSide, true);
        //Set velocity to left
        body.setVelocityX(walkSpeed);
      }
      //UP
    } else if (this.cursors.up?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(AnimationKeys.fHeroRunUp, true);
        body.setVelocity(0, -runSpeed);
      } else {
        this.femaleHero.anims.play(AnimationKeys.fHeroWalkUp, true);
        body.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (this.cursors.down?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(AnimationKeys.fHeroRunDown, true);
        body.setVelocity(0, runSpeed);
      } else {
        this.femaleHero.anims.play(AnimationKeys.fHeroWalkDown, true);
        body.setVelocityY(walkSpeed);
      }
    } else {
      const parts = this.femaleHero.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      body.setVelocity(0, 0);
      this.femaleHero.play(parts.join("-"));
    }
    //KEYBOARD INPUT END-----------------------------------------------
  }
}
