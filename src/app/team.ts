import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  team1 = signal('Team 1');
  team2 = signal('Team 2');

  score1 = signal(0);
  score2 = signal(0);

  incrementScore(team: 'score1' | 'score2') {
    this[team].update(score => score + 1);
  }

  decrementScore(team: 'score1' | 'score2') {
    this[team].update(score => Math.max(0, score - 1));
  }

  resetScores() {
    this.score1.set(0);
    this.score2.set(0);
  }
}