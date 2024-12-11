import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  @Input({ required: true }) type!: string;

  @HostBinding('draggable') draggable = true;
  @HostBinding('style.cursor') cursor = 'move';

  constructor(private elementRef: ElementRef, private dragService: DragService) {}

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    this.dragService.tileRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.dragService.dragStart(event, this.type);
  }

  @HostListener('dragend', ['$event']) onDragEnd(event: DragEvent) {
    if (this.dragService.isAllowOnceTileDropped()) {
      this.draggable = false;
      this.cursor = 'not-allowed';
    }
  }
}
