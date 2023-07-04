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
  private playerLizardsCollider?: Phaser.Physics.Arcade.Collider;

  private arrows!: Phaser.Physics.Arcade.Group;
  private lizards!: Phaser.Physics.Arcade.Group;

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

    // Arrows START----------------------------------------------
    this.arrows = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image
    })


    //Adding HERO:-----------------------------------------------
    this.hero = this.add.fhero(48.5, 41.5, HeroAnimsKeys.fHeroIdleDown, undefined);
    this.hero.setArrows(this.arrows);

    //Adding GREEN LIZARDS :-------------------------------------
    this.lizards = this.physics.add.group({
      classType: LizardGreen,
    });

    this.lizards.get(50, 180);
    this.lizards.get(370, 250);



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
    this.physics.add.collider(this.lizards, this.wallsLayer);
    this.physics.add.collider(this.arrows, this.wallsLayer, this.handleArrowWallsCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    this.physics.add.collider(this.arrows, this.lizards, this.handleArrowLizardCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    this.physics.add.collider(this.hero, this.wallsLayer);
    this.playerLizardsCollider = this.physics.add.collider(this.hero, this.lizards, this.handleHeroLizardCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

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

  private handleArrowWallsCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject) {
    obj1.destroy()
  }


  private handleArrowLizardCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject) {
    //obj1 = arrow
    obj1.destroy()
    const lizard = obj2 as LizardGreen
    lizard.handleDamage(this.hero.damage)
    if (lizard._Health <= 0) {
      lizard.destroy()
    }
  }


  private handleHeroLizardCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const lizard = obj2 as LizardGreen;

    const dx = this.hero.x - lizard.x;
    const dy = this.hero.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(250);
    this.hero.removeHealth(lizard.damage())
    this.hero.handleDamage(dir);
    eventsCenter.emit('updateHealth', this.hero.getHealth());
    if (this.hero.getHealth() <= 0) {
      this.playerLizardsCollider?.destroy()
    }
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