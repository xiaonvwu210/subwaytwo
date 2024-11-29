import * as PIXI from 'pixi.js';
import { PowerUp } from './powerUp';

export class PowerUpManager {
  constructor(app) {
    this.app = app;
    this.powerUps = [];
    this.spawnTimer = 0;
    this.spawnInterval = 180; // Every 3 seconds (60fps)
    this.types = ['speed', 'magnet', 'shield'];
  }

  spawnPowerUp() {
    const lane = Math.floor(Math.random() * 3);
    const type = this.types[Math.floor(Math.random() * this.types.length)];
    const x = 300 + (lane * 100);
    const powerUp = new PowerUp(this.app, type, x, -50);
    this.powerUps.push(powerUp);
  }

  update(speed) {
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnPowerUp();
      this.spawnTimer = 0;
    }

    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      powerUp.update(speed);
      
      if (!powerUp.active) {
        this.powerUps.splice(i, 1);
      }
    }
  }

  checkCollision(player) {
    for (const powerUp of this.powerUps) {
      if (!powerUp.active) continue;
      
      const powerUpBounds = powerUp.getBounds();
      const playerBounds = player.getBounds();
      
      if (this.intersects(playerBounds, powerUpBounds)) {
        powerUp.collect();
        return powerUp.type;
      }
    }
    return null;
  }

  intersects(a, b) {
    return !(
      a.x + a.width < b.x ||
      b.x + b.width < a.x ||
      a.y + a.height < b.y ||
      b.y + b.height < a.y
    );
  }
}