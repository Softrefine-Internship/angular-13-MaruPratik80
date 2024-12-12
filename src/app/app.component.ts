import { Component, OnInit } from '@angular/core';
import { map, timer } from 'rxjs';
import { DragService } from './drag.service';
import { Tile } from './tile.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  time = timer(0, 1000).pipe(map(() => new Date()));

  screen!: Tile[];
  tileOptions!: Tile[];

  constructor(private dragService: DragService) {}

  ngOnInit(): void {
    this.screen = this.dragService.screen;
    this.tileOptions = this.dragService.tileOptions;
  }

  changeZIndex(draggedTile: any) {
    this.screen.forEach(tile => (tile.zIndex = tile === draggedTile ? 1 : 0));
    this.screen = this.screen.sort((a, b) => (a.zIndex > b.zIndex ? 1 : a.zIndex < b.zIndex ? -1 : 0));
  }
}
