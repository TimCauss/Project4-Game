import Phaser from "phaser";
import eventsCenter from "../scenes/EventsCenter";

import EnemyAnimsKeys from "../consts/EnemyAnimsKeys";
import EnemyDamage from "../consts/EnemyDamage";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const randDirection = (exclude: Direction) => {
  let newDirection = Phaser.Math.Between(0, 3);
  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3);
  }
  return newDirection;
};

export default class LizardGreen extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.LEFT;
  private moveEvent: Phaser.Time.TimerEvent;
  private damageValue = EnemyDamage.lizard;


  public _Health = 20;
  private hpBar!: Phaser.GameObjects.Rectangle

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number
  ) {
    super(scene, x, y, texture, frame);

    //Create the class & adding it an animation
    scene.physics.add.existing(this);
    this.anims.play(EnemyAnimsKeys.LizardGreenIdle);

    //Collide with world bounds:
    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );

    //Event based on time:
    //Call randDirection every 2000ms
    this.moveEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 10000),
      loop: true,
      callback: () => {
        this.direction = randDirection(this.direction);
      },
    });

    //Physics
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.onCollide = true;
    body.debugBodyColor = 0xff0000;
    body.setSize(this.width, this.height * 0.8);
    body.setOffset(this.width * 0.05, this.height * 0.25);
    this.createHealthBar()
  }

  //Health Bar:
  createHealthBar() {
    this.hpBar = this.scene.add.rectangle(this.x, this.y - this.height * 0.2, 20, 3, 0xff0000)
  }
  //Health Bar:
  updateHealthBarPos(x: number, y: number) {
    this.hpBar.setPosition(x, y - this.height * 0.4)

  }

  updateHealthBarValue(value: number) {
    this.hpBar.width = value;
  }

  handleDamage(value: number) {
    this._Health -= value;
  }

  //destroy method in case of scene changement:
  destroy(fromScene?: boolean) {
    this.moveEvent.destroy();
    super.destroy(fromScene);
  }

  damage() {
    return this.damageValue;
  }

  private handleTileCollision(
    go: Phaser.GameObjects.GameObject,
    // tile: Phaser.Tilemaps.Tile
  ) {
    if (go !== this) {
      return;
    }

    this.direction = randDirection(this.direction);
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    //Speed setting:
    const speed = 0;
    this.updateHealthBarPos(this.x, this.y);
    //Movement settings:
    switch (this.direction) {
      case Direction.RIGHT:
        this.scaleX = 1;
        this.setOffset(this.width * 0.05, this.height * 0.25);
        this.setVelocity(speed, 0);
        this.anims.play(EnemyAnimsKeys.LizardGreenRun, true);
        break;
      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        this.scaleX = -1;
        this.setOffset(this.width, this.height * 0.25);
        this.anims.play(EnemyAnimsKeys.LizardGreenRun, true);
        break;
      case Direction.UP:
        this.setVelocity(0, -speed);
        this.anims.play(EnemyAnimsKeys.LizardGreenRun, true);
        break;
      case Direction.DOWN:
        this.setVelocity(0, speed);
        this.anims.play(EnemyAnimsKeys.LizardGreenRun, true);
        break;
    }
  }

  create() {
    eventsCenter.on('takingDamage', this.updateHealthBarValue, this);
  }
}
