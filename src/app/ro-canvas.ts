import { Path, Layer } from 'paper';
import { AfterViewInit, Component, ElementRef, Renderer2, RendererFactory2, Signal, ViewChild, computed, effect, input } from '@angular/core';
import { PaperScopeService } from './paper-scope.service';

export type Vector = [number, number];


@Component({
  standalone: true,
  template: `
    <ng-content></ng-content>
    <canvas width="500" height="300" #canvas></canvas>
  `,
  selector: 'ro-canvas',
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  project!: paper.Project;

  isInitialized = false;

  constructor(private paperSrvc: PaperScopeService) {

  }
  ngAfterViewInit(): void {
    this.project = this.paperSrvc.createProject(this.canvas.nativeElement);

  }

}

@Component({
  standalone: true,
  selector: 'ro-canvas-layer',
  template: `<ng-content></ng-content>`,
})
export class CanvasLayerComponent {
  paperLayer = new Layer();
}

@Component({
  standalone: true,
  selector: 'ro-canvas-circle',
  template: ``,
})
export class CircleComponent {
  center = input<Vector>([0, 0]);
  radius = input(42);

  circleRef = new Path.Circle({
    center: this.center(),
    radius: this.radius()
  })
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
