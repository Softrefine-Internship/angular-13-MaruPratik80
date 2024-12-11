import { ElementRef, Injectable } from '@angular/core';
import { Tile } from './tile.model';

@Injectable({ providedIn: 'root' })
export class DragService {
  screen: Tile[] = [];
  tileOptions: Tile[] = [
    { type: 'textbox', x: 0, y: 0, zIndex: 0 },
    { type: 'image', x: 0, y: 0, zIndex: 0 },
    { type: 'clock', x: 0, y: 0, zIndex: 0 },
    { type: 'dropdown', x: 0, y: 0, zIndex: 0 },
  ];

  allowOnceTypes = ['image', 'clock'];
  droppedTileType?: string;
  offset: { left: number; top: number } = { left: 0, top: 0 };
  dropPos: { x: number; y: number } = { x: 0, y: 0 };

  dropZoneRect!: any;
  tileRect!: any;

  isAllowOnceTileDropped() {
    return this.allowOnceTypes.some(type => this.droppedTileType === type);
  }

  dragStart(event: DragEvent, type: string) {
    this.offset = {
      left: event.clientX - this.tileRect.x,
      top: event.clientY - this.tileRect.y,
    };
    event.dataTransfer?.setData('text/plain', type);
  }

  drop(event: DragEvent) {
    const tile: Tile = {
      type: event.dataTransfer?.getData('text/plain') as string,
      x: this.dropPos.x,
      y: this.dropPos.y,
      zIndex: 1,
    };
    this.screen.push(tile);
    this.droppedTileType = tile.type;
  }

  dragOver(event: DragEvent) {
    if (!event.dataTransfer) return;
    this.calcDropPosition(event);

    const out =
      this.dropPos.x < 0 ||
      this.dropPos.y < 0 ||
      this.dropPos.x > this.dropZoneRect.width - this.tileRect.width ||
      this.dropPos.y > this.dropZoneRect.height - this.tileRect.height;

    event.dataTransfer.dropEffect = out ? 'none' : 'copy';
  }

  calcDropPosition(event: DragEvent) {
    this.dropPos.x = event.x - this.dropZoneRect.x - this.offset.left;
    this.dropPos.y = event.y - this.dropZoneRect.y - this.offset.top;
  }
}
