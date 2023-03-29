import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../common/user";
import {Comment} from "../common/comment";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.css']
})
export class ReplyButtonComponent {

  @Input() currentUser!: User;
  @Input() comment!: (Comment | Reply);

  @Output() openReplybox = new EventEmitter();

  isCurrentUser(){
    return this.comment.user.username === this.currentUser.username;
  }

}
