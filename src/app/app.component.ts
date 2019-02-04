import { Component, Renderer2 } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Square {
  index: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Drag and Drop Demo';
  
  circles = new Array(10).fill(null).map((el, idx) => `${idx}`);
  squares: Square[] = [];

  constructor(private renderer: Renderer2) {
    for (let i = 0; i < 100; i++) {
      this.squares.push({
        index: `${i}`,
        id: `${i}`
      });
    }
  }

  get squareIds() {
    return this.squares.map(sq => sq.id);
  }

  drop(event) {
    const circleElement = event.item.element.nativeElement
    const squareElement = event.container.element.nativeElement;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('moved', circleElement.id, 'from index', event.previousIndex, 'to index', event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, [], event.previousIndex, event.currentIndex);
      this.renderer.addClass(squareElement, 'full');
      this.renderer.removeClass(squareElement, 'empty');
      console.log('dropped', circleElement.id, 'into', squareElement.id);
    }
  }

}
