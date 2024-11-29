import * as PIXI from 'pixi.js';
import { Player } from './player';
import { ObstacleManager } from './obstacleManager';
import { PowerUpManager } from './powerUpManager';
import { ScoreManager } from './scoreManager';
import { Tutorial } from './ui/tutorial';
import { Leaderboard } from './ui/leaderboard';
import { PowerUpDisplay } from './ui/powerUpDisplay';

export class Game {
  constructor(app) {
    this.app = app;
    this.player = new Player(app);
    this.obstacleManager = new ObstacleManager(app);
    this.powerUpManager = new PowerUpManager(app);
    this.scoreManager = new ScoreManager();
    this.tutorial = new Tutorial(app);
    this.leaderboard = new Leaderboard();
    this.powerUpDisplay = new PowerUpDisplay(app);
    this.baseSpeed = 5;
    this.isGameOver = false;
    this.isPaused = false;
    this.isStarted = false;
    
    this.setupControls();
    this.setupOverlays();
  }

  setupOverlays() {
    const startBtn = document.querySelector('.start-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const startOverlay = document.getElementById('startOverlay');
    const gameOverOverlay = document.getElementById('gameOverOverlay');

    startBtn.addEventListener('click', () => {
      startOverlay.style.display = 'none';
      this.isStarted = true;
      this.start();
    });

    restartBtn.addEventListener('click', () => {
      gameOverOverlay.style.display = 'none';
      this.resetGame();
    });
  }

  start() {
    if (!this.isStarted) return;
    this.app.ticker.add(() => this.gameLoop());
  }

  resetGame() {
    // Reset game state
    this.isGameOver = false;
    this.isPaused = false;
    this.baseSpeed = 5;
    
    // Reset player
    this.player.reset();
    
    // Reset managers
    this.obstacleManager.reset();
    this.powerUpManager.reset();
    this.scoreManager.reset();
    
    // Start game
    this.isStarted = true;
    this.start();
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.isStarted || this.isGameOver) return;
      
      if (e.key === 'ArrowLeft') {
        this.player.moveLeft();
      } else if (e.key === 'ArrowRight') {
        this.player.moveRight();
      } else if (e.key === 'ArrowUp') {
        this.player.jump();
      } else if (e.key === 'p' || e.key === 'P') {
        this.togglePause();
      }
    });

    document.querySelector('.pause-btn').addEventListener('click', () => {
      if (!this.isStarted || this.isGameOver) return;
      this.togglePause();
    });
  }

  gameLoop() {
    if (this.isGameOver || this.isPaused || !this.isStarted) return;

    // Calculate current speed
    let currentSpeed = this.baseSpeed;
    if (this.player.hasSpeedBoost) {
      currentSpeed *= 1.5;
    }

    this.player.update();
    this.obstacleManager.update(currentSpeed);
    this.powerUpManager.update(currentSpeed);
    this.scoreManager.update();
    
    // Update power-up display
    this.powerUpDisplay.updateDisplay(this.player.powerUpTimers);
    
    // Check for power-up collection
    const collectedPowerUp = this.powerUpManager.checkCollision(this.player);
    if (collectedPowerUp) {
      this.player.activatePowerUp(collectedPowerUp);
    }
    
    // Check for obstacle collision
    if (this.obstacleManager.checkCollision(this.player)) {
      if (this.player.hasShield) {
        this.player.hasShield = false;
        this.player.powerUpTimers.shield = 0;
      } else {
        this.gameOver();
      }
    }

    this.baseSpeed += 0.001;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.app.ticker.stop();
    } else {
      this.app.ticker.start();
    }
  }

  gameOver() {
    this.isGameOver = true;
    document.getElementById('gameOverOverlay').style.display = 'flex';
    this.leaderboard.saveScore(this.scoreManager.getScore());
  }
}