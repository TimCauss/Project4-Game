import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    //On load les inputs
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {}

  update() {}
}
