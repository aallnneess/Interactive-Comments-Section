import {Component, Input} from '@angular/core';
import {Comment} from "../common/comment";
import {DataService} from "../data.service";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() hidden = true;
  @Input() comment!: (Comment | Reply);
  counter = 0;

  modalOpend = false;
  modalClosed = false;


  constructor(private dataService: DataService) {
  }

  openModal(target: number) {

    if (!this.modalOpend && !this.modalClosed) {
      this.modalOpend = true;
      setTimeout(() => {
        this.counter = target;
      },100);
    }

    return `opacity-${this.counter}`;

  }

  closeModal(target: number) {

    if (this.modalOpend) {
      this.modalOpend = false;
      this.modalClosed = true;
      setTimeout(() => {
        this.counter = target;

      },100);
    }

    return `opacity-${this.counter}`;

  }

  restData() {
    setTimeout(() => {
      this.hidden = true;
      this.modalClosed = false;
    },400)
  }

  delete() {
    this.dataService.delete(this.comment);
  }
}



