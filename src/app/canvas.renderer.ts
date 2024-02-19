import { Renderer2 } from "@angular/core";
import { Layer, Group, Project } from 'paper';
import { AttachedPaperElement, CustomRenderer } from "./custom.renderer";

export class CanvasRenderer extends CustomRenderer<paper.Project> {

  canvasElement!: HTMLCanvasElement;


  constructor(domRenderer: Renderer2, element: any, type: any) {
    super(domRenderer, element, type);
  }

  override createElement(name: string, namespace?: string | null | undefined) {
    const result = super.createElement(name, namespace);
    if (name === 'canvas') {
      this.canvasElement = result;
      this.setPaperElementRef(new Project(this.canvasElement), this.element);
      (window as any)['paperProject'] = this.paperElementRef;
    }

    return result;
  }

  override insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean | undefined): void {
    return super.insertBefore(parent, newChild, refChild, isMove);
  }

  override appendChild(parent: any, newChild: any): void {
    const layer: AttachedPaperNode | undefined = newChild.attachedPaperElement;
    super.appendChild(parent, newChild);

    if (layer) {
      this.paperElementRef.addLayer(layer.element as any);
    }
  }


}

export class GroupRenderer extends CustomRenderer<paper.Group> {
  // group: paper.Group;
  constructor(domRenderer: Renderer2, element: any, type: any, isLayer = false) {
    super(domRenderer, element, type);
    this.setPaperElementRef(isLayer ? new Layer() : new Group(), element);
  }

  override appendChild(parent: any, newChild: any): void {
    super.appendChild(parent, newChild);
    console.log('Append child of group', parent, newChild);
  }

  override insertBefore(parent: any, newChild: any, refChild: HTMLElement, isMove?: boolean | undefined): void {
    console.log('Insert before of group', { parent, newChild, refChild, isMove })

    return super.insertBefore(parent, newChild, refChild, isMove);
  }

  override insertPaperElement(parent: AttachedPaperElement<paper.Group>, newChild: AttachedPaperElement<any>, refChild: AttachedPaperElement<any> | null): void {
    if (refChild == null) {
      this.paperElementRef.addChild(newChild.element);
    } else {
      newChild.element.insertBelow(refChild.element);
    }
  }
}

export class ItemRenderer extends CustomRenderer<paper.Item> {

  item?: paper.Item;

  constructor(domRenderer: Renderer2, element: any, type: any) {
    super(domRenderer, element, type);
  }

  updateItem(item: paper.Item) {
    this.setPaperElementRef(item, this.element);
  }
}

interface AttachedPaperNode {
  element: paper.Item;
}