import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class UIBarScene extends Phaser.Scene {

    constructor() {
        super(SceneKeys.UIBarScene)
    };

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const UIBackground = this.add.rectangle(0, height, width, height * 0.11, 0x000, 150)
        UIBackground.setOrigin(0, 1)
        this.add.rectangle(width * 0.5, height - 8, 102, 12, 0xffffff)
        this.add.rectangle(width * 0.5, height - 8, 100, 10, 0x000)
        this.add.rectangle(width * 0.5, height - 22, 102, 12, 0xffffff)
        this.add.rectangle(width * 0.5, height - 22, 100, 10, 0x000)

        // energy bar



    }

}
