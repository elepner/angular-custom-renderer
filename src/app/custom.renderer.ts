import { Renderer2, RendererStyleFlags2 } from '@angular/core';
import { Project, Layer, Group } from 'paper';



export class CustomRenderer extends Renderer2 {

  static counter = 0;
  readonly id = CustomRenderer.counter++;

  tag: string;


  proj?: paper.Project;
  group?: paper.Group;
  layer?: paper.Layer;

  constructor(private readonly domRenderer: Renderer2, private readonly element: any, private readonly type: any) {

    super();
    this.tag = element?.tagName ?? '';
    this.log('Creating new Renderer', element, type);


    if (this.tag === 'RO-CANVAS') {
      const canvas = document.createElement('canvas');
      this.proj = new Project(canvas);
      (window as any)['paperProj'] = this.proj;
      canvas.width = 500;
      canvas.height = 300;
      element.appendChild(canvas);
    }

    else if (this.tag.startsWith('RO-CANVAS-')) {
      this.group = new Group();
      this.element.paperGroup = this.group;
    }

  }

  get data(): { [key: string]: any } {
    this.log('Calling for get method with');
    return this.domRenderer.data;
  }
  destroy(): void {
    this.log('Calling for destroy method');
    return this.domRenderer.destroy();
  }

  readonly elementToPaperItem = new WeakMap<object, paper.Item>();
  createElement(name: string, namespace?: string | null | undefined) {

    const result = this.domRenderer.createElement(name, namespace);

    if (name === 'ro-canvas-layer') {
      const layer = new Layer();
      result.attachedPaperLayer = layer;
    }

    if (name === 'ro-canvas-circle') {
      console.log('Creating canvas circle')


      result.paperItemSetter = (item: paper.Item) => {
        this.elementToPaperItem.set(result, item);
        // console.log('paper item setter', item);
      }
    }

    this.log('Calling for createElement method', { name, namespace, result });
    return result
  }
  createComment(value: string) {
    this.log(`Calling for createComment method '${value}'`);
    return this.domRenderer.createComment(value);
  }
  createText(value: string) {
    this.log('Calling for createText method');
    return this.domRenderer.createText(value);
  }
  appendChild(parent: any, newChild: any): void {
    this.log('Calling for appendChild method', { parent, newChild });
    if (newChild.tagName === 'RO-CANVAS-LAYER') {
      this.proj!.addLayer(newChild.attachedPaperLayer);
    }
    return this.domRenderer.appendChild(parent, newChild);
  }
  insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean | undefined): void {
    this.log('Calling for insertBefore method', { parent, newChild, refChild, isMove });
    if (parent.tagName === 'RO-CANVAS-COMPOSITE') {

      const paperRef = this.elementToPaperItem.get(newChild);

      parent.paperGroup.addChild(paperRef);
    }

    if (parent.attachedPaperLayer) {
      const l = parent.attachedPaperLayer as paper.Layer;
      l.addChild(newChild.paperGroup)
    }

    return this.domRenderer.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent: any, oldChild: any, isHostElement?: boolean | undefined): void {
    this.log('Calling for removeChild method', parent, oldChild, isHostElement);
    return this.domRenderer.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode: any, preserveContent?: boolean | undefined) {
    this.log('Calling for selectRootElement method', { selectorOrNode, preserveContent });
    return this.domRenderer.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node: any) {
    const result = this.domRenderer.parentNode(node);
    this.log('Calling for parentNode method', node, 'Result: ', result);
    return result;
  }
  nextSibling(node: any) {
    this.log('Calling for nextSibling method');
    return this.domRenderer.nextSibling(node);
  }
  setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
    this.log('Calling for setAttribute method', el, name, value, namespace);
    return this.domRenderer.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el: any, name: string, namespace?: string | null | undefined): void {
    this.log('Calling for removeAttribute method');
    return this.domRenderer.removeAttribute(el, name, namespace);
  }
  addClass(el: any, name: string): void {
    this.log('Calling for addClass method');
    return this.domRenderer.addClass(el, name);
  }
  removeClass(el: any, name: string): void {
    this.log('Calling for removeClass method');
    return this.domRenderer.removeClass(el, name);
  }
  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2 | undefined): void {
    this.log('Calling for setStyle method');
    return this.domRenderer.setStyle(el, style, value, flags);
  }
  removeStyle(el: any, style: string, flags?: RendererStyleFlags2 | undefined): void {
    this.log('Calling for removeStyle method');
    return this.domRenderer.removeStyle(el, style, flags);
  }
  setProperty(el: any, name: string, value: any): void {
    this.log('Calling for setProperty method', { el, name, value });
    return this.domRenderer.setProperty(el, name, value);
  }
  setValue(node: any, value: string): void {
    this.log('Calling for setValue method', node, value);
    return this.domRenderer.setValue(node, value);
  }
  listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
    this.log('Calling for listen method with', target, eventName, callback);
    return this.domRenderer.listen(target, eventName, callback);
  }

  logResult(f: () => any) {
    const result = f();
    return result;
  }

  private log(...args: any[]) {
    console.log(`${this.tag}:${this.id},`, ...args);
  }
}
