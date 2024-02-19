import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Vector } from './ro-canvas';

@Component({
  selector: 'app-root',

  template: `
    <button (click)="add()">Add</button>
    <button (click)="remove()">Remove</button>
    <button (click)="swap()">Swap</button>
    <button>Hide All Even</button>
    {{centers() | json}}

    <ro-canvas style="display: block;">
      <ro-canvas-layer>
        @for (c of centers(); track c.id) {
          <ro-canvas-composite [center]="c.c"></ro-canvas-composite>
        }
      </ro-canvas-layer>
    </ro-canvas>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-custom-renderer';

  counter = 0;

  centers = signal<{ id: number, c: Vector }[]>([{
    id: this.counter++,
    c: [42, 69]
  }])

  add() {
    this.centers.update((v) => {
      const last = v.at(-1);
      return [...v, {
        c: [last?.c[0] ?? 42 + 1, last?.c[1] ?? 69 + 1].map(x => x + 10) as any,
        id: this.counter++
      }]
    })
  }

  remove() {
    this.centers.update((v) => {
      return v.slice(1);
    })
  }

  swap() {
    this.centers.update((v) => {
      const copy = [...v];
      const tmp = copy[0];
      copy[0] = copy.at(-1)!;
      copy[copy.length - 1] = tmp;
      return copy;
    })
  }
}
