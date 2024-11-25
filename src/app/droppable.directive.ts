import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDroppable]',
})
export class DroppableDirective implements OnInit, OnDestroy {
  private onDragEnter!: Function;
  private onDragLeave!: Function;
  private onDragOver!: Function;
  private onDrop!: Function;

  // @Input()
  // set appDroppable(options: DroppableOptions) {
  //   if (options) {
  //     this.options = options;
  //   }
  // }

  // @Output() public onDroppableComplete: EventEmitter<DroppableEventObject> = new EventEmitter();

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.renderer.addClass(this.elementRef.nativeElement, 'app-droppable');
  }

  ngOnInit() {
    this.addOnDragEvents();
  }

  ngOnDestroy() {
    this.onDragEnter();
    this.onDragLeave();
    this.onDragOver();
    this.onDrop();
  }

  private addOnDragEvents(): void {
    this.onDragEnter = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragenter',
      (event: DragEvent): void => {
        this.handleDragEnter(event);
      }
    );
    this.onDragLeave = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragleave',
      (event: DragEvent): void => {
        this.handleDragLeave(event);
      }
    );
    this.onDragOver = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragover',
      (event: DragEvent): void => {
        this.handleDragOver(event);
      }
    );

    this.onDrop = this.renderer.listen(this.elementRef.nativeElement, 'drop', (event: DragEvent): void => {
      this.handleDrop(event);
    });
  }

  private handleDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.renderer.addClass(event.target, 'js-app-droppable--zone');
  }

  private handleDragLeave(event: DragEvent): void {
    this.renderer.removeClass(event.target, 'js-app-droppable--zone');
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent): void {
    console.log(event);
    this.renderer.removeClass(event.target, 'js-app-droppable--zone');
    const child = this.dragService.tile.nativeElement.cloneNode(true);
    console.dir(this.elementRef.nativeElement);
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    console.log(rect);
    const top = event.y - rect.y;
    const left = event.x - rect.x;
    this.renderer.setStyle(child, 'top', `${top}px`);
    this.renderer.setStyle(child, 'left', left + 'px');
    console.dir(child);
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }
}
