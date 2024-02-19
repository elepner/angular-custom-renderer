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
    <input type="number" [ngModel]="radius()" (ngModelChange)="radius.set($event)">
    @for (c of circles(); track c.id; let i = $index) {
      <input type="color" [ngModel]="c.color" (ngModelChange)="setColor($event, i)">
    }

    {{circles() | json}}


    <ro-canvas style="display: block;">
      <ro-canvas-layer>
        @for (c of circles(); track c.id; let i = $index) {
          <ro-canvas-composite [center]="c.c" [radius]="radius()" [color]="c.color"></ro-canvas-composite>
        }
      </ro-canvas-layer>
    </ro-canvas>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-custom-renderer';
  radius = signal<number>(10);

  counter = 0;
  color = signal<string>('#aabbcc');

  circles = signal<{ id: number, c: Vector, color: string }[]>([{
    id: this.counter++,
    c: [42, 69],
    color: ''
  }, {
    id: this.counter++,
    c: [50, 10],
    color: '#336699'
  }])

  add() {
    this.circles.update((v) => {
      const last = v.at(-1);
      return [...v, {
        c: [last?.c[0] ?? 42 + 1, last?.c[1] ?? 69 + 1].map(x => x + 10) as any,
        id: this.counter++,
        color: last?.color ?? '#000000'
      }]
    })
  }

  setColor(newColor: string, index: number) {
    this.circles.update((res) => {
      res = [...res];
      res[index] = {
        ...res[index],
        color: newColor
      }
      return res;
    })
  }

  remove() {
    this.circles.update((v) => {
      return v.slice(1);
    })
  }

  swap() {
    this.circles.update((v) => {
      const copy = [...v];
      const tmp = copy[0];
      copy[0] = copy.at(-1)!;
      copy[copy.length - 1] = tmp;
      return copy;
    })
  }
}
