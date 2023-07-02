import Phaser from "phaser";



// enum import start----------------------------------
import TextureKeys from "../consts/TextureKeys";
import MapKeys from "../consts/MapKeys";
import SceneKeys from "../consts/SceneKeys";
import HeroAnimsKeys from "../consts/HeroAnimsKeys";
import LizardGreen from "../game/LizardGreen";
// enum import end------------------------------------

import "../game/FemaleHero";
import eventsCenter from "./EventsCenter";
import FemaleHero from "../game/FemaleHero";

export default class Game extends Phaser.Scene {


  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;
  private hero!: FemaleHero;


  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.cameras.main.setZoom(2)
    this.cameras.main.setRoundPixels(false)
  }

  create() {

    // Creating tilemap instance using .make.timeMap() method
    const map = this.make.tilemap({ key: MapKeys.Level1 });
    const tileset = map.addTilesetImage("tyniDungeon", TextureKeys.Tiles);

    // Creating layers using .createLayer() method
    map.createLayer("Ground", tileset as Phaser.Tilemaps.Tileset);
    this.wallsLayer = map.createLayer("Walls", tileset as Phaser.Tilemaps.Tileset)!;
    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Debugging Method START------------------------------------
    this.collisonDebug(false);
    // Debugging Method END--------------------------------------

    //Adding HERO:-----------------------------------------------
    this.hero = this.add.fhero(48.5, 41.5, HeroAnimsKeys.fHeroIdleDown, undefined);

    console.log(this.hero);

    //Adding GREEN LIZARDS :-------------------------------------
    const lizards = this.physics.add.group({
      classType: LizardGreen,
    });
    let i;
    for (i = 0; i < 1; ++i) {
      lizards.get(Phaser.Math.Between(169, 390), Phaser.Math.Between(36, 75));
    }

    //Regen PowerBar---------------------------------------------
    this.time.addEvent({
      delay: 10,
      loop: true,
      callback: () => {
        if (this.hero.getPower() < 100) {
          this.hero.addPowerPercent(0.005);
          this.updatePower()
        }
      },
    });

    //Regen HealthBar---------------------------------------------
    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.hero.getHealth() < 100) {
          this.hero.addHealthPercent(0.001);
          this.updateHealth()
        }
        if (this.hero.getHealth() > 100) {
          this.hero.setHealth(100)
          this.updateHealth();
        }
        if (this.hero.getHealth() <= 0) {
          this.hero.setHealth(0)
          this.updateHealth();
        }
      },
    });


    // Collider Settings-----------------------------------------
    this.physics.add.collider(lizards, this.wallsLayer);
    this.physics.add.collider(this.hero, this.wallsLayer);
    this.physics.add.collider(this.hero, lizards, this.handleHeroLizardCollision, undefined, this);

    //Cameras Settings-------------------------------------------
    this.cameras.main.startFollow(this.hero, true);


    this.scene.run(SceneKeys.UIBarScene);
  }

  private updatePower() {
    eventsCenter.emit('updatePower', this.hero.getPower());
  }

  private updateHealth() {
    eventsCenter.emit('updateHealth', this.hero.getHealth());
  }


  private handleHeroLizardCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const lizard = obj2 as LizardGreen;

    const dx = this.hero.x - lizard.x;
    const dy = this.hero.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(250);
    eventsCenter.emit('updateHealth', this.hero.getHealth());
    this.hero.removeHealth(lizard.damage())
    this.hero.handleDamage(dir);
  }


  update() {

    if (!this.hero) {
      return
    }

    this.hero.update(this.cursors)

  }

  // Debugging Collision Method----------------------------------
  private collisonDebug(enabled: boolean) {
    if (enabled) {
      const debugGraphics = this.add.graphics().setAlpha(0.7);
      this.wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      });
    }
  }
}