import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import eventsCenter from "../scenes/EventsCenter";

export default class UIBarScene extends Phaser.Scene {


    private width!: number;
    private height!: number;
    private powerBar!: Phaser.GameObjects.Rectangle;
    private hpBar!: Phaser.GameObjects.Rectangle;

    constructor() {
        super(SceneKeys.UIBarScene)
    };

    create() {

        this.width = this.scale.width;
        this.height = this.scale.height;
        const UIBackground = this.add.rectangle(0, this.height, this.width, this.height * 0.11, 0x000, 150)
        UIBackground.setOrigin(0, 1)
        this.add.rectangle(this.width * 0.5, this.height - 8, 102, 12, 0xffffff)
        this.add.rectangle(this.width * 0.5, this.height - 8, 100, 10, 0x000)
        this.add.rectangle(this.width * 0.5, this.height - 22, 102, 12, 0xffffff)
        this.add.rectangle(this.width * 0.5, this.height - 22, 100, 10, 0x000)
        this.powerBar = this.add.rectangle(150, this.height - 8, 100, 10, 0x42f569).setOrigin(0, 0.5)
        this.hpBar = this.add.rectangle(150, this.height - 22, 100, 10, 0xf54242).setOrigin(0, 0.5)

        eventsCenter.on('updatePower', this.updatePower, this)
        eventsCenter.on('updateHealth', this.updateHealth, this)
    }

    private updatePower(power: number) {
        this.powerBar.width = power;
    }

    private updateHealth(value: number) {
        this.hpBar.width = value;
    }
}