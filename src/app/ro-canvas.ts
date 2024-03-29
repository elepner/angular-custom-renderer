import { Path, Layer, Point, Color } from 'paper';
import { AfterViewInit, Component, ElementRef, Renderer2, RendererFactory2, Signal, ViewChild, computed, effect, input } from '@angular/core';
import { PaperScopeService } from './paper-scope.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { ItemRenderer } from './canvas.renderer';

export type Vector = [number, number];


@Component({
  standalone: true,
  template: `
    <canvas #canvas></canvas>
    <ng-content></ng-content>
  `,
  selector: 'ro-canvas',
})
export class CanvasComponent {

  constructor() {

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
  color = input<string>();
  circleRef = new Path.Circle(new Point(this.center()[0], this.center()[1]), this.radius());

  circleRefSignal = computed(() => {
    const result = new Path.Circle(new Point(this.center()[0], this.center()[1]), this.radius());
    result.strokeColor = this.color() as any;
    result.strokeWidth = 5;
    result.data = {
      color: this.color()
    }
    return result;
  })

  counter = 0;

  constructor(r: Renderer2) {

    if (r instanceof ItemRenderer) {
      r.updateItem(this.circleRef);
      effect(() => {
        this.counter += 0.01
        const toReplace = this.circleRefSignal();
        // toReplace.strokeColor = new Color(this.color() as any);
        // console.log('Color to replace:', toReplace.strokeColor, this.color());
        this.circleRef.replaceWith(toReplace);
        this.circleRef = toReplace;
      })
    } else {
      throw new Error('It is not circle renderer');
    }


  }
}


@Component({
  standalone: true,
  selector: 'ro-canvas-composite',
  imports: [CircleComponent],
  template: `
    @for (c of circles(); track $index) {
      <ro-canvas-circle [center]="c.c" [radius]="c.r" [color]="color()"></ro-canvas-circle>
    }
  `
})
export class CompositeComponent {
  center = input<Vector>([0, 0]);
  radius = input<number>(0);
  color = input<string>('');
  deltas = [
    [-10, -10],
    [10, 10]
  ]

  circles: Signal<{
    c: Vector,
    r: number
  }[]> = computed(() => {
    return this.deltas.map((d) => {
      const c = this.center();
      return {
        c: [c[0] + d[0], c[1] + d[1]],
        r: this.radius()
      };
    })
  })
}
