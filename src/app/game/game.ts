import { Component, computed, inject, signal } from '@angular/core';
import { WordService } from '../word';
import { MaterialModule } from '../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [MaterialModule, RouterLink],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  private wordService = inject(WordService);
  protected showWord = signal(false);

  word = computed(() => this.showWord() ? this.wordService.word() : `n° ${this.wordService.index() + 1}`);

  next() {
    this.wordService.next();
  }

  previous() {
    this.wordService.previous();
  }

  toggleShowWord() {
    this.showWord.update(v => !v);
  }
}