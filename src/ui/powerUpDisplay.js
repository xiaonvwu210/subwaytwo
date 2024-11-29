import * as PIXI from 'pixi.js';

export class PowerUpDisplay {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.displays = {
      shield: this.createPowerUpDisplay('🛡️', 0),
      speed: this.createPowerUpDisplay('⚡', 1),
      magnet: this.createPowerUpDisplay('🧲', 2)
    };
  }

  createPowerUpDisplay(icon, index) {
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#ffffff'
    });

    const display = {
      icon: new PIXI.Text(icon, style),
      timer: new PIXI.Text('', style)
    };

    display.icon.x = 700;
    display.icon.y = 100 + (index * 40);
    display.timer.x = 730;
    display.timer.y = 100 + (index * 40);

    this.container.addChild(display.icon);
    this.container.addChild(display.timer);

    display.icon.visible = false;
    display.timer.visible = false;

    return display;
  }

  updateDisplay(powerUps) {
    Object.entries(powerUps).forEach(([type, timer]) => {
      const display = this.displays[type];
      if (timer > 0) {
        display.icon.visible = true;
        display.timer.visible = true;
        display.timer.text = Math.ceil(timer / 60).toString() + 's';
      } else {
        display.icon.visible = false;
        display.timer.visible = false;
      }
    });
  }
}