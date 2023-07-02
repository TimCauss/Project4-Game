import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import eventsCenter from "../scenes/EventsCenter";

export default class UIBarScene extends Phaser.Scene {


    private width!: number;
    private height!: number;
    private powerBar!: Phaser.GameObjects.Rectangle;
    private powerText!: Phaser.GameObjects.Text;

    private hpBar!: Phaser.GameObjects.Rectangle;
    private healthText!: Phaser.GameObjects.Text;

    constructor() {
        super(SceneKeys.UIBarScene)
    };

    private updatePower(power: number) {
        this.powerBar.width = power * 2;
        this.powerText.text = Math.round(power).toString();
    }

    private updateHealth(value: number) {
        if (value < 0) {
            return;
        }
        this.hpBar.width = value * 2;
        this.healthText.text = Math.round(value).toString();
    }


    create() {
        eventsCenter.on('updatePower', this.updatePower, this)
        eventsCenter.on('updateHealth', this.updateHealth, this)

        this.width = this.scale.width;
        this.height = this.scale.height;
        const UIBackground = this.add.rectangle(0, this.height, this.width, this.height * 0.11, 0x000, 150)
        UIBackground.setOrigin(0, 1)

        //HEALTH BAR:
        this.add.rectangle((this.width * 0.5), this.height - 50, (102 * 2), 12 * 2, 0xffffff)
        this.add.rectangle((this.width * 0.5), this.height - 50, 100 * 2, 10 * 2, 0x000)
        this.hpBar = this.add.rectangle((this.width * 0.5), this.height - 50, (100 * 2), 10 * 2, 0xf54242)
        this.healthText = this.add.text(this.width * 0.5 - 90, this.height - 57, '100')

        // POWER BAR:
        this.add.rectangle((this.width * 0.5), this.height - 22, 102 * 2, 12 * 2, 0xffffff)
        this.add.rectangle((this.width * 0.5), this.height - 22, 100 * 2, 10 * 2, 0x000)
        this.powerBar = this.add.rectangle((this.width * 0.5), this.height - 22, 100 * 2, 10 * 2, 0x11c21c)
        this.powerText = this.add.text(this.width * 0.5 - 90, this.height - 29, '100')

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('updatePower', this.updatePower, this)
            eventsCenter.off('updateHealth', this.updateHealth, this)
        })

    }


}