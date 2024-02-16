import { AfterViewInit, Component, ElementRef, Renderer2, RendererFactory2, Signal, ViewChild, computed, effect, input } from '@angular/core';

export type Vector = [number, number];


@Component({
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  selector: 'ro-canvas',
})
export class CanvasComponent {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  isInitialized = false;

  constructor() {

  }

}

@Component({
  standalone: true,
  selector: 'ro-canvas-layer',
  template: `<ng-content></ng-content>`,
})
export class CanvasLayerComponent {
  children: any[] = [];
}

@Component({
  standalone: true,
  selector: 'ro-canvas-circle',
  template: ``,
})
export class CircleComponent {
  center = input<Vector>([0, 0]);
  radius = input(42);
  constructor() { }
}


@Component({
  standalone: true,
  selector: 'ro-canvas-composite',
  imports: [CircleComponent],
  template: `
    @for (c of circles(); track $index) {
      <ro-canvas-circle [center]="c"></ro-canvas-circle>
    }
  `
})
export class CompositeComponent {
  center = input<Vector>([0, 0]);
  deltas = [
    [-10, -10],
    [10, 10]
  ]

  circles: Signal<Vector[]> = computed(() => {
    return this.deltas.map((d) => {
      const c = this.center();
      return [c[0] + d[0], c[1] + d[1]];
    })
  })
}
