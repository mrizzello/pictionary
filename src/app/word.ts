import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export type Level = 'easy' | 'middle' | 'difficult' | 'mixte';

const LEVEL_BY_CODE: Record<string, Exclude<Level, 'mixte'>> = {
  '1': 'easy',
  '2': 'middle',
  '3': 'difficult',
};

const EMPTY_POOLS: Record<Level, string[]> = {
  easy: [],
  middle: [],
  difficult: [],
  mixte: [],
};

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array: string[]): string[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private http = inject(HttpClient);

  // Une liste mélangée par niveau ; « mixte » = union de tous les mots, re-mélangée.
  private pools = toSignal(
    this.http.get('assets/words.txt', { responseType: 'text' }).pipe(
      map((text) => {
        const all: { text: string; level: Exclude<Level, 'mixte'> }[] = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            const [word, code] = line.split(';');
            return { text: word.trim(), level: LEVEL_BY_CODE[code?.trim()] ?? 'middle' };
          });

        const byLevel = (level: Exclude<Level, 'mixte'>) =>
          shuffle(all.filter((w) => w.level === level).map((w) => w.text));

        return {
          easy: byLevel('easy'),
          middle: byLevel('middle'),
          difficult: byLevel('difficult'),
          mixte: shuffle(all.map((w) => w.text)),
        } satisfies Record<Level, string[]>;
      }),
    ),
    { initialValue: EMPTY_POOLS },
  );

  // Niveau actif (défaut : middle, pas de persistance entre rechargements).
  private _level = signal<Level>('middle');
  readonly level = this._level.asReadonly();

  // Position courante dans chaque liste.
  private indices = signal<Record<Level, number>>({
    easy: 0,
    middle: 0,
    difficult: 0,
    mixte: 0,
  });

  // Compteur global affiché (n° X), incrémenté à chaque mot vu.
  private _count = signal(0);
  readonly count = this._count.asReadonly();

  private currentPool = computed(() => this.pools()[this._level()]);

  word = computed(() => {
    const pool = this.currentPool();
    if (!pool.length) return '';
    return pool[this.indices()[this._level()] % pool.length];
  });

  next() {
    this.advance(1);
  }

  previous() {
    this.advance(-1);
  }

  setLevel(level: Level) {
    if (level === this._level()) return;
    this._level.set(level);
    // Saute immédiatement au mot suivant de la liste du nouveau niveau.
    this.advance(1);
  }

  private advance(delta: number) {
    const level = this._level();
    const len = this.pools()[level].length;
    if (!len) return;
    this.indices.update((idx) => ({
      ...idx,
      [level]: (idx[level] + delta + len) % len,
    }));
    this._count.update((c) => Math.max(0, c + delta));
  }
}
