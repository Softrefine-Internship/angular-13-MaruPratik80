import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  private onDragStart!: Function;
  private onDragEnd!: Function;

  // @Input()
  // set appDraggable() {

  // }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }

  ngOnInit() {
    this.addDragEvents();
  }

  ngOnDestroy() {
    this.onDragStart();
    this.onDragEnd();
  }

  private addDragEvents(): void {
    this.onDragStart = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragstart',
      (event: DragEvent): void => {
        this.dragService.tile = this.elementRef;
        console.log(event);
      }
    );

    this.onDragEnd = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragend',
      (event: DragEvent): void => {
        console.log(event);
        console.dir(this.elementRef.nativeElement);
      }
    );
  }
}
