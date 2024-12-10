import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DragService } from './drag.service';
import { DragDrop } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dragService: DragService,
    private dragdrop: DragDrop
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'app-droppable');
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.renderer.addClass(event.target, 'js-app-droppable--zone');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    this.renderer.removeClass(event.target, 'js-app-droppable--zone');
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    this.renderer.removeClass(event.target, 'js-app-droppable--zone');
    const child = this.dragService.tile.nativeElement.cloneNode(true);
    // this.dragdrop.createDrag(child);
    const screenEl = this.elementRef.nativeElement;
    const top = screenEl.offsetTop + screenEl.clientTop;
    const left = screenEl.offsetLeft + screenEl.clientLeft;
    const offset = event.dataTransfer?.getData('text/plain');
    const [offsetX, offsetY] = (offset as string).split(' ');
    this.renderer.setStyle(child, 'top', event.y - top - +offsetY + 'px');
    this.renderer.setStyle(child, 'left', event.x - left - +offsetX + 'px');
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }
}
