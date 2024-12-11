import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective implements OnInit {
  constructor(private elementRef: ElementRef, private dragService: DragService) {}

  ngOnInit(): void {
    this.dragService.dropZoneRect = this.elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
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
