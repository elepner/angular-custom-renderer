import { NgModule, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomRenderer } from './custom.renderer';
import { CanvasComponent, CanvasLayerComponent, CircleComponent, CompositeComponent } from './ro-canvas';

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
  constructor(rend: RendererFactory2) {
    const oldFn = rend.createRenderer;

    rend.createRenderer = function (element, type) {

      // if (tagName?.startsWith('RO-CANVAS-')) {
      //   return new CustomRenderer(oldFn.call(rend, element, type));
      // }
      //console.log(`Creating renderer, type ${tagName}`, element, type);
      return new CustomRenderer(oldFn.call(rend, element, type), element?.tagName);
      //return oldFn.call(rend, element, type);
    };
  }
}
