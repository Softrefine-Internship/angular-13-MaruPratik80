import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective {
  constructor(private elementRef: ElementRef, private dragService: DragService) {}

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.dragService.dropZoneRect = this.elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragService.dragOver(event);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragService.drop(event);
  }
}
