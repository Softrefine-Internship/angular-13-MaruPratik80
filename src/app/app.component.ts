import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  time = new Date();
  onDropp(event: any) {
    console.log(event);
  }
  onDrop(event: DragEvent) {
    console.log(event);
    event.dataTransfer;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';

    console.log(event);
  }

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    console.log(event);
  }
}
