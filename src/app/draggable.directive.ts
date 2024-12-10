import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    this.dragService.tile = this.elementRef;
    console.log(event);
    const { x, y } = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - x;
    const offsetY = event.clientY - y;
    event.dataTransfer?.setData('text/plain', `${offsetX} ${offsetY}`);
  }

  @HostListener('dragend', ['$event']) onDragEnd(event: DragEvent) {
    console.log(event);
    console.dir(this.elementRef.nativeElement);
  }
}
