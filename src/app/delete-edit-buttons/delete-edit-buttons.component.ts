import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from "../common/comment";
import {User} from "../common/user";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-delete-edit-buttons',
  templateUrl: './delete-edit-buttons.component.html',
  styleUrls: ['./delete-edit-buttons.component.css']
})
export class DeleteEditButtonsComponent {

  @Input() comment!: (Comment | Reply);
  @Input() currentUser!: User;

  @Output() openUpdatebox = new EventEmitter();

  isCurrentUser(){
    return this.comment.user.username === this.currentUser.username;
  }
}
