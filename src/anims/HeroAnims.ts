import Phaser from "phaser";

//enum import:
import HeroAnimsKeys from "../consts/HeroAnimsKeys";
import TextureKeys from "../consts/TextureKeys";

const createHeroAnims = (anims: Phaser.Animations.AnimationManager) => {
  //FemaleHero Animation START---------------------------------------
  //IDLE DOWN:-------------------------------------------------------
  anims.create({
    key: HeroAnimsKeys.fHeroIdleDown,
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
    key: HeroAnimsKeys.fHeroIdleUp,
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
    key: HeroAnimsKeys.fHeroIdleSide,
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
    key: HeroAnimsKeys.fHeroWalkDown,
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
    key: HeroAnimsKeys.fHeroRunDown,
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
    key: HeroAnimsKeys.fHeroWalkUp,
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
    key: HeroAnimsKeys.fHeroRunUp,
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
    key: HeroAnimsKeys.fHeroWalkSide,
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
    key: HeroAnimsKeys.fHeroRunSide,
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 8,
      prefix: "run-side-",
      suffix: ".png",
    }),
    frameRate: 15,
    repeat: -1,
  });
  //FAINT:------------------------------------------------------------
  anims.create({
    key: HeroAnimsKeys.fHeroFaint,
    frames: anims.generateFrameNames(TextureKeys.FemaleHero, {
      start: 1,
      end: 4,
      prefix: "faint-",
      suffix: ".png",
    }),
    frameRate: 5,
    repeat: 0,
  });
  //FemaleHero Animations END-----------------------------------------
};

export { createHeroAnims };
