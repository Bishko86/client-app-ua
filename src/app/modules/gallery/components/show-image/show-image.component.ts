import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent {
@Input() url: string;
@Output() closeModal = new EventEmitter()

  onClose() {
    this.closeModal.emit();
  }

}
