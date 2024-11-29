import * as PIXI from 'pixi.js';
import { Game } from './game';

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x87CEEB,
});

document.getElementById('gameContainer').appendChild(app.view);

const game = new Game(app);
game.start();