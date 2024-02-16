import { Renderer2, RendererStyleFlags2 } from '@angular/core';

export class CustomRenderer extends Renderer2 {
  constructor(private readonly domRenderer: Renderer2) {
    super();
  }

  get data(): { [key: string]: any } {
    console.log('Calling for get method with');
    return this.domRenderer.data;
  }
  destroy(): void {
    console.log('Calling for destroy method');
    return this.domRenderer.destroy();
  }
  createElement(name: string, namespace?: string | null | undefined) {
    console.log('Calling for createElement method', name, namespace);
    return this.domRenderer.createElement(name, namespace);
  }
  createComment(value: string) {
    console.log('Calling for createComment method');
    return this.domRenderer.createComment(value);
  }
  createText(value: string) {
    console.log('Calling for createText method');
    return this.domRenderer.createText(value);
  }
  appendChild(parent: any, newChild: any): void {
    console.log('Calling for appendChild method', parent, newChild);
    return this.domRenderer.appendChild(parent, newChild);
  }
  insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean | undefined): void {
    console.log('Calling for insertBefore method');
    return this.domRenderer.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent: any, oldChild: any, isHostElement?: boolean | undefined): void {
    console.log('Calling for removeChild method');
    return this.domRenderer.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode: any, preserveContent?: boolean | undefined) {
    console.log('Calling for selectRootElement method');
    return this.domRenderer.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node: any) {
    console.log('Calling for parentNode method');
    return this.domRenderer.parentNode(node);
  }
  nextSibling(node: any) {
    console.log('Calling for nextSibling method');
    return this.domRenderer.nextSibling(node);
  }
  setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
    console.log('Calling for setAttribute method');
    return this.domRenderer.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el: any, name: string, namespace?: string | null | undefined): void {
    console.log('Calling for removeAttribute method');
    return this.domRenderer.removeAttribute(el, name, namespace);
  }
  addClass(el: any, name: string): void {
    console.log('Calling for addClass method');
    return this.domRenderer.addClass(el, name);
  }
  removeClass(el: any, name: string): void {
    console.log('Calling for removeClass method');
    return this.domRenderer.removeClass(el, name);
  }
  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2 | undefined): void {
    console.log('Calling for setStyle method');
    return this.domRenderer.setStyle(el, style, value, flags);
  }
  removeStyle(el: any, style: string, flags?: RendererStyleFlags2 | undefined): void {
    console.log('Calling for removeStyle method');
    return this.domRenderer.removeStyle(el, style, flags);
  }
  setProperty(el: any, name: string, value: any): void {
    console.log('Calling for setProperty method');
    return this.domRenderer.setProperty(el, name, value);
  }
  setValue(node: any, value: string): void {
    console.log('Calling for setValue method');
    return this.domRenderer.setValue(node, value);
  }
  listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
    console.log('Calling for listen method with', target, eventName, callback);
    return this.domRenderer.listen(target, eventName, callback);
  }
}
