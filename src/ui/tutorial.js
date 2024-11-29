import * as PIXI from 'pixi.js';

export class Tutorial {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.createTutorial();
  }

  createTutorial() {
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowDistance: 2
    });

    const controls = [
      '← → 左右移动',
      '↑ 跳跃',
      'P 暂停',
      '道具说明:',
      '🛡️ 护盾 - 抵挡一次碰撞',
      '⚡ 加速 - 提升速度',
      '🧲 磁铁 - 吸引金币'
    ];

    controls.forEach((text, index) => {
      const tutorialText = new PIXI.Text(text, style);
      tutorialText.x = 20;
      tutorialText.y = 100 + (index * 40);
      this.container.addChild(tutorialText);
    });

    // 3秒后隐藏教程
    setTimeout(() => {
      this.container.visible = false;
    }, 3000);
  }
}