import * as PIXI from 'pixi.js';

export class ObstacleManager {
  constructor(app) {
    this.app = app;
    this.obstacles = [];
    this.spawnTimer = 0;
    this.spawnInterval = 60;
  }

  reset() {
    // Remove all existing obstacles
    for (const obstacle of this.obstacles) {
      this.app.stage.removeChild(obstacle);
    }
    this.obstacles = [];
    this.spawnTimer = 0;
  }

  spawnObstacle() {
    const lane = Math.floor(Math.random() * 3);
    const obstacle = new PIXI.Graphics();
    obstacle.beginFill(0xFF0000);
    obstacle.drawRect(0, 0, 40, 40);
    obstacle.endFill();
    obstacle.x = 300 + (lane * 100);
    obstacle.y = -50;
    
    this.app.stage.addChild(obstacle);
    this.obstacles.push(obstacle);
  }

  update(speed) {
    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnObstacle();
      this.spawnTimer = 0;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      obstacle.y += speed;

      if (obstacle.y > this.app.screen.height) {
        this.app.stage.removeChild(obstacle);
        this.obstacles.splice(i, 1);
      }
    }
  }

  checkCollision(player) {
    const playerBounds = player.getBounds();
    
    for (const obstacle of this.obstacles) {
      const obstacleBounds = obstacle.getBounds();
      if (this.intersects(playerBounds, obstacleBounds)) {
        return true;
      }
    }
    return false;
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