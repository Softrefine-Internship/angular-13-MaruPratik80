import { Component, OnInit } from '@angular/core';
import { map, timer } from 'rxjs';
import { DragService } from './drag.service';
import { Tile } from './tile.model';

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
  }
}
