import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private http = inject(HttpClient);
  private words = toSignal(
    this.http.get('assets/words.txt', { responseType: 'text' }).pipe(
      map((text) => {
        const words = text.split('\n').filter((word) => word.trim().length > 0);
        // Fisher-Yates (aka Knuth) Shuffle
        for (let i = words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [words[i], words[j]] = [words[j], words[i]];
        }
        return words;
      }),
    ),
    { initialValue: [] },
  );

  private _index = signal(0);
  readonly index = this._index.asReadonly();

  word = computed(() => this.words()[this._index()]);

  next() {
    this._index.update((index) => (index + 1) % this.words().length);
  }

  previous() {
    this._index.update((index) => (index - 1 + this.words().length) % this.words().length);
  }
}
