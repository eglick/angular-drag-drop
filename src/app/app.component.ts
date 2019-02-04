import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Circle {
  index: string;
  id: string;
}

interface Square {
  index: string;
  id: string;
  data: HTMLElement[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Drag and Drop Demo';
  
  circles2: Circle[] = [];
  circles = new Array(5).fill(null).map((el, idx) => `circ-${idx}`);
  squares: Square[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.squares.push({
        index: `${i}`,
        id: `sq-${i}`,
        data: []
      });
    }
    for (let i = 0; i < 5; i++) {
      this.circles2.push({
        index: `${i}`,
        id: `circle-${i}`
      });
    }
    // console.log('squares: ', this.squares);
    // console.log('squareIds: ', this.squareIds);
    // console.log('squareData: ', this.squareData);
    // console.log('circleIds: ', this.circleIds);
  }

  get squareIds() {
    return this.squares.map(sq => sq.id);
  }

  get squareData() {
    return this.squares.map(sq => sq.data);
  }

  drop(event) {
    const circleId = event.item.element.nativeElement.id;
    const squareId = event.container.element.nativeElement.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('moved', circleId, 'from index', event.previousIndex, 'to index', event.currentIndex);
    } else {
      if (!event.container.data) { return; }
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.log('dropped', circleId, 'into', squareId);
    }

  }

}
