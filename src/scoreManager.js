export class ScoreManager {
  constructor() {
    this.score = 0;
    this.scoreElement = document.querySelector('.score');
  }

  reset() {
    this.score = 0;
    this.updateDisplay();
  }

  update() {
    this.score++;
    this.updateDisplay();
  }

  updateDisplay() {
    this.scoreElement.textContent = this.score.toString().padStart(6, '0');
  }

  getScore() {
    return this.score;
  }
}