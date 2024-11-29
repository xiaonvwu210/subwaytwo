import * as PIXI from 'pixi.js';

export class PowerUp {
  constructor(app, type, x, y) {
    this.app = app;
    this.type = type;
    this.sprite = this.createSprite(type);
    this.sprite.x = x;
    this.sprite.y = y;
    this.active = true;
  }

  createSprite(type) {
    const sprite = new PIXI.Graphics();
    
    switch(type) {
      case 'speed':
        // Create lightning bolt shape
        sprite.beginFill(0xFFFF00);
        sprite.moveTo(0, -15);
        sprite.lineTo(10, -5);
        sprite.lineTo(0, 5);
        sprite.lineTo(10, 15);
        sprite.lineTo(-5, 0);
        sprite.lineTo(5, -10);
        sprite.lineTo(0, -15);
        break;
        
      case 'magnet':
        // Create horseshoe magnet shape
        sprite.beginFill(0x0000FF);
        sprite.arc(0, 0, 15, 0, Math.PI);
        sprite.drawRect(-15, -5, 5, 15);
        sprite.drawRect(10, -5, 5, 15);
        break;
        
      case 'shield':
        // Create shield shape
        sprite.beginFill(0x00FF00);
        sprite.moveTo(0, -15);
        sprite.arc(0, 0, 15, -Math.PI/2, Math.PI/2);
        sprite.lineTo(0, 15);
        sprite.arc(0, 0, 10, Math.PI/2, -Math.PI/2, true);
        break;
    }
    
    sprite.endFill();
    this.app.stage.addChild(sprite);
    return sprite;
  }

  update(speed) {
    if (!this.active) return;
    this.sprite.y += speed;
    
    if (this.sprite.y > this.app.screen.height) {
      this.destroy();
    }
  }

  collect() {
    this.active = false;
    this.app.stage.removeChild(this.sprite);
  }

  destroy() {
    this.active = false;
    this.app.stage.removeChild(this.sprite);
  }

  getBounds() {
    return this.sprite.getBounds();
  }
}