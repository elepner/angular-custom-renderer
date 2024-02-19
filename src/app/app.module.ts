import { NgModule, Renderer2, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomRenderer } from './custom.renderer';
import { CanvasComponent, CanvasLayerComponent, CircleComponent, CompositeComponent } from './ro-canvas';
import { PaperScopeService } from './paper-scope.service';
import { CanvasRenderer, GroupRenderer, ItemRenderer } from './canvas.renderer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CanvasComponent,
    CanvasLayerComponent,
    CircleComponent,
    CompositeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  canvasCreators: Record<string, (renderer: Renderer2, element: any, type: any) => Renderer2> = {
    'RO-CANVAS': (renderer: Renderer2, element: any, type: any) => new CanvasRenderer(renderer, element, type),
    'RO-CANVAS-LAYER': (renderer: Renderer2, element: any, type: any) => new GroupRenderer(renderer, element, type, true),
    'RO-CANVAS-COMPOSITE': (renderer: Renderer2, element: any, type: any) => new GroupRenderer(renderer, element, type, false),
    'RO-CANVAS-CIRCLE': (renderer: Renderer2, element: any, type: any) => new ItemRenderer(renderer, element, type)
  }

  constructor(rend: RendererFactory2, scopeSrvc: PaperScopeService) {
    const oldFn = rend.createRenderer;
    scopeSrvc.createProject(document.createElement('canvas'));

    const creators = this.canvasCreators;

    rend.createRenderer = function (element, type) {

      const tagName: string = element?.tagName;

      const result = creators[tagName];
      if (result) {
        return result(oldFn.call(rend, element, type), element, type);
      }
      return new CustomRenderer(oldFn.call(rend, element, type), element, type);

    };
  }
}
