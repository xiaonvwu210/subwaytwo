import * as PIXI from 'pixi.js';

export class Player {
  constructor(app) {
    this.app = app;
    this.sprite = this.createSprite();
    this.lane = 1; // 0: left, 1: center, 2: right
    this.isJumping = false;
    this.velocity = 0;
    this.gravity = 0.5;
    
    // Power-up states
    this.hasShield = false;
    this.hasMagnet = false;
    this.hasSpeedBoost = false;
    this.powerUpTimers = {
      shield: 0,
      magnet: 0,
      speed: 0
    };
    
    // Shield effect
    this.shieldGraphics = new PIXI.Graphics();
    this.app.stage.addChild(this.shieldGraphics);
  }

  reset() {
    this.lane = 1;
    this.isJumping = false;
    this.velocity = 0;
    this.sprite.x = 400;
    this.sprite.y = 500;
    this.hasShield = false;
    this.hasMagnet = false;
    this.hasSpeedBoost = false;
    this.powerUpTimers = {
      shield: 0,
      magnet: 0,
      speed: 0
    };
    this.shieldGraphics.clear();
  }

  createSprite() {
    const sprite = new PIXI.Graphics();
    sprite.beginFill(0xFF6B6B);
    sprite.drawRect(0, 0, 40, 60);
    sprite.endFill();
    sprite.x = 400;
    sprite.y = 500;
    this.app.stage.addChild(sprite);
    return sprite;
  }

  moveLeft() {
    if (this.lane > 0) {
      this.lane--;
      this.sprite.x -= 100;
    }
  }

  moveRight() {
    if (this.lane < 2) {
      this.lane++;
      this.sprite.x += 100;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocity = -15;
    }
  }

  activatePowerUp(type) {
    switch(type) {
      case 'shield':
        this.hasShield = true;
        this.powerUpTimers.shield = 300; // 5 seconds at 60fps
        break;
      case 'magnet':
        this.hasMagnet = true;
        this.powerUpTimers.magnet = 300;
        break;
      case 'speed':
        this.hasSpeedBoost = true;
        this.powerUpTimers.speed = 300;
        break;
    }
  }

  updatePowerUps() {
    // Update shield
    if (this.hasShield) {
      this.powerUpTimers.shield--;
      this.updateShieldEffect();
      if (this.powerUpTimers.shield <= 0) {
        this.hasShield = false;
        this.shieldGraphics.clear();
      }
    }

    // Update magnet
    if (this.hasMagnet) {
      this.powerUpTimers.magnet--;
      if (this.powerUpTimers.magnet <= 0) {
        this.hasMagnet = false;
      }
    }

    // Update speed boost
    if (this.hasSpeedBoost) {
      this.powerUpTimers.speed--;
      if (this.powerUpTimers.speed <= 0) {
        this.hasSpeedBoost = false;
      }
    }
  }

  updateShieldEffect() {
    this.shieldGraphics.clear();
    if (this.hasShield) {
      this.shieldGraphics.lineStyle(2, 0x00FF00, 0.8);
      this.shieldGraphics.drawCircle(
        this.sprite.x + this.sprite.width / 2,
        this.sprite.y + this.sprite.height / 2,
        40
      );
    }
  }

  update() {
    if (this.isJumping) {
      this.sprite.y += this.velocity;
      this.velocity += this.gravity;

      if (this.sprite.y >= 500) {
        this.sprite.y = 500;
        this.isJumping = false;
        this.velocity = 0;
      }
    }

    this.updatePowerUps();
  }

  getBounds() {
    return this.sprite.getBounds();
  }
}