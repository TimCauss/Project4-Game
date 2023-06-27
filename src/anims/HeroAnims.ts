import Phaser from "phaser";

//enum import:
import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";

const createHeroAnims = (anims: Phaser.Animations.AnimationManager) => {
  //FemaleHero Animation START---------------------------------------
  //IDLE DOWN:-------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroIdleDown,
    //generate frame:
    frames: [
      {
        key: TextureKeys.FemaleHero,
        frame: "idle.png",
      },
    ],
  });
  //IDLE UP:-------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroIdleUp,
    //generate frame:
    frames: [
      {
        key: TextureKeys.FemaleHero,
        frame: "walk-up-3.png",
      },
    ],
  });
  //IDLE SIDE:-------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroIdleSide,
    //generate frame:
    frames: [
      {
        key: TextureKeys.FemaleHero,
        frame: "walk-side-3.png",
      },
    ],
  });

  //WALK DOWN:-------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroWalkDown,
    //generate frames:
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "walk-down-",
      suffix: ".png",
    }),
    frameRate: 10,
    repeat: -1,
  });
  //RUN DOWN:--------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroRunDown,
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "run-down-",
      suffix: ".png",
    }),
    frameRate: 15,
    repeat: -1,
  });
  //WALK UP:---------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroWalkUp,
    //generate frames:
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "walk-up-",
      suffix: ".png",
    }),
    frameRate: 10,
    repeat: -1,
  });
  //RUN UP:---------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroRunUp,
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "run-up-",
      suffix: ".png",
    }),
    frameRate: 15,
    repeat: -1,
  });
  //WALK SIDE:-------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroWalkSide,
    //generate frames:
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "walk-side-",
      suffix: ".png",
    }),
    frameRate: 10,
    repeat: -1,
  });
  //RUN SIDE:---------------------------------------------------------
  anims.create({
    key: AnimationKeys.fHeroRunSide,
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "run-side-",
      suffix: ".png",
    }),
    frameRate: 15,
    repeat: -1,
  });
  //FemaleHero Animations END-----------------------------------------
};

export { createHeroAnims };
