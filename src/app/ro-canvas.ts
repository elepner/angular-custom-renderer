import { AfterViewInit, Component, ElementRef, Renderer2, RendererFactory2, ViewChild, effect, input } from '@angular/core';

type Vector = [number, number];


@Component({
  standalone: true,
  template: `
    <canvas #canvas></canvas>
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
