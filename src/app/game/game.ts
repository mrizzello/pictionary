import { Component, computed, inject, signal } from '@angular/core';
import { Level, WordService } from '../word';
import { MaterialModule } from '../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [MaterialModule, RouterLink],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected wordService = inject(WordService);
  protected showWord = signal(false);

  protected readonly levels: { value: Level; label: string }[] = [
    { value: 'easy', label: '🟢' },
    { value: 'middle', label: '🟡' },
    { value: 'difficult', label: '🔴' },
    { value: 'mixte', label: '🎲' },
  ];

  word = computed(() =>
    this.showWord() ? this.wordService.word() : `n° ${this.wordService.count() + 1}`,
  );

  next() {
    this.wordService.next();
  }

  previous() {
    this.wordService.previous();
  }

  setLevel(level: Level) {
    this.wordService.setLevel(level);
  }

  toggleShowWord() {
    this.showWord.update(v => !v);
  }
}
