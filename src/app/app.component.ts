import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  time = timer(0, 1000).pipe(map(() => new Date()));
  // off: any;
  // _pointerPosition: any;
  // posInside: { source: any; x: number; y: number } = { source: null, x: 0, y: 0 };

  // @ViewChild('screenRef', { read: ElementRef, static: true }) dropZone!: ElementRef;

  // screen: any[] = [];
  // tileOptions: any[] = [
  //   { type: 'textbox', x: 0, y: 0, zIndex: 0 },
  //   { type: 'image', x: 0, y: 0, zIndex: 0 },
  //   { type: 'clock', x: 0, y: 0, zIndex: 0 },
  //   { type: 'dropdown', x: 0, y: 0, zIndex: 0 },
  // ];

  // constructor() {}

  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer !== event.container) {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     event.item.data.y =
  //       this._pointerPosition.y - this.off.y - this.dropZone.nativeElement.getBoundingClientRect().top;
  //     event.item.data.x =
  //       this._pointerPosition.x - this.off.x - this.dropZone.nativeElement.getBoundingClientRect().left;
  //     this.changeZIndex(event.item.data);
  //   } else {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   }
  //   this.posInside = { source: null, x: 0, y: 0 };
  // }

  // changeZIndex(item: any) {
  //   this.screen.forEach(x => (x['z-index'] = x == item ? 1 : 0));
  // }

  // moved(event: CdkDragMove) {
  //   this._pointerPosition = event.pointerPosition;
  // }

  // changePosition(event: CdkDragDrop<any>, field: any) {
  //   const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
  //   const rectElement = event.item.element.nativeElement.getBoundingClientRect();

  //   let y = +field.y + event.distance.y;
  //   let x = +field.x + event.distance.x;
  //   const out =
  //     y < 0 || x < 0 || y > rectZone.height - rectElement.height || x > rectZone.width - rectElement.width;

  //   if (!out) {
  //     field.y = y;
  //     field.x = x;
  //     this.screen = this.screen.sort((a, b) =>
  //       a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
  //     );
  //   } else {
  //     this.tileOptions.push(field);
  //     this.screen = this.screen.filter(x => x != field);
  //   }
  // }
}
