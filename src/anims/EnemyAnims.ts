import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";

const createLizardAnims = (anims: Phaser.Animations.AnimationManager) => {
  //LizardGreen Animations START--------------------------------------
  //IDLE
  anims.create({
    key: AnimationKeys.LizardGreenIdle,
    frames: anims.generateFrameNames(TextureKeys.LizardGreen, {
      start: 0,
      end: 3,
      prefix: "lizard_m_idle_anim_f",
      suffix: ".png",
    }),
    frameRate: 6,
    repeat: -1,
  });
  //IDLE
  anims.create({
    key: AnimationKeys.LizardGreenRun,
    frames: anims.generateFrameNames(TextureKeys.LizardGreen, {
      start: 0,
      end: 3,
      prefix: "lizard_m_run_anim_f",
      suffix: ".png",
    }),
    frameRate: 6,
    repeat: -1,
  });
};

export { createLizardAnims };
