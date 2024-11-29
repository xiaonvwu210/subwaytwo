export class Leaderboard {
  constructor() {
    this.scores = this.loadScores();
    this.createLeaderboardUI();
  }

  loadScores() {
    const savedScores = localStorage.getItem('subwayRunnerScores');
    return savedScores ? JSON.parse(savedScores) : [];
  }

  saveScore(score) {
    const playerName = prompt('恭喜！请输入你的名字：') || 'Anonymous';
    this.scores.push({ name: playerName, score });
    this.scores.sort((a, b) => b.score - a.score);
    this.scores = this.scores.slice(0, 10); // 只保留前10名
    localStorage.setItem('subwayRunnerScores', JSON.stringify(this.scores));
    this.updateLeaderboardUI();
  }

  createLeaderboardUI() {
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.className = 'leaderboard';
    leaderboardDiv.innerHTML = `
      <h2>排行榜</h2>
      <div class="leaderboard-content"></div>
    `;
    document.body.appendChild(leaderboardDiv);
    this.updateLeaderboardUI();
  }

  updateLeaderboardUI() {
    const content = document.querySelector('.leaderboard-content');
    content.innerHTML = this.scores
      .map((entry, index) => `
        <div class="leaderboard-entry">
          <span class="rank">#${index + 1}</span>
          <span class="name">${entry.name}</span>
          <span class="score">${entry.score}</span>
        </div>
      `)
      .join('');
  }
}