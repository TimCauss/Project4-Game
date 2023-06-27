import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import HeroAnimsKeys from "../consts/HeroAnimsKeys";

//Preparing First Hero Class:
export default class FemaleHero extends Phaser.GameObjects.Container {
  //Private declarations:
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private femaleHero!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create Keyboard Input:
    this.cursors = scene.input.keyboard!.createCursorKeys();

    //Create FemaleHero Sprite:
    this.femaleHero = scene.add
      .sprite(0, 0, TextureKeys.FemaleHero)
      .setOrigin(0.5, 1)
      .play(HeroAnimsKeys.fHeroIdleDown);

    //Add the femaleHero as a child of Container
    this.add(this.femaleHero);

    //Creating Physics
    scene.physics.add.existing(this);

    //Adjusting physics body (hitbox)size, color and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.debugBodyColor = 0x3cda15;
    body.setSize(17, this.femaleHero.height * 0.6);
    body.setOffset(-this.femaleHero.width * 0.25, -23);

    //setting collide with walls:
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    //KEYBOARD INPUT START:----------------------------------------------
    //Speed setting:
    const walkSpeed = 50;
    const runSpeed = walkSpeed * 1.75;

    if (!this.cursors || !this.femaleHero) {
      return;
    }

    //listen keyboard input:
    

    //LEFT(Walk & Run):

    if (this.cursors.left?.isDown) {
      //Return sprite:
      this.femaleHero.scaleX = -1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        body.setVelocity(-runSpeed, 0);
      } else {
        //Launch animation
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        //Set velocity to left
        body.setVelocityX(-walkSpeed);
      }
      //RIGHT
    } else if (this.cursors.right?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroRunSide, true);
        body.setVelocity(runSpeed, 0);
      } else {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroWalkSide, true);
        body.setVelocityX(walkSpeed);
      }
      //UP
    } else if (this.cursors.up?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroRunUp, true);
        body.setVelocity(0, -runSpeed);
      } else {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroWalkUp, true);
        body.setVelocityY(-walkSpeed);
      }
      //DOWN
    } else if (this.cursors.down?.isDown) {
      this.femaleHero.scaleX = 1;
      if (this.cursors.shift?.isDown) {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroRunDown, true);
        body.setVelocity(0, runSpeed);
      } else {
        this.femaleHero.anims.play(HeroAnimsKeys.fHeroWalkDown, true);
        body.setVelocityY(walkSpeed);
      }
    } else {
      if (!this.femaleHero.anims.currentAnim) return;
      const parts = this.femaleHero.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      body.setVelocity(0, 0);
      this.femaleHero.play(parts.join("-"));
    }
    //KEYBOARD INPUT END-----------------------------------------------
  }
}
