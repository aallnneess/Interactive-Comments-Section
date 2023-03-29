import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Comment} from "../common/comment";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {User} from "../common/user";
import {UserService} from "../user.service";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit, OnDestroy{

  @ViewChild('text') myTextarea!: ElementRef;

  @Input() image!: string;

  @Input() open = false;

  @Input() replyHost!: (Comment | Reply);

  subscription!: Subscription;
  currentUser!: User;

  replyMessage = '';


  constructor(
    public dataService: DataService,
    public userService: UserService) {
  }

  sendReply(value: string) {

    value = value.substring(this.replyHost.user.username.length + 1);

    let host!: (Comment | Reply);

    if (this.replyHost.typ === 'comment') {

      host = <Comment>this.replyHost;

      let comment = new Reply(value,this.currentUser, 0);
      comment.createdAt = '1 minute ago';
      comment.parentId = this.replyHost.id;
      comment.replyingTo = this.replyHost.user.username;
      this.dataService.addCommentByParentComment(host,comment);
      this.open = false;
    }else {

      host = <Reply>this.replyHost;

      let comment = new Reply(value,this.currentUser, 0);
      comment.createdAt = '1 minute ago';
      comment.parentId = this.replyHost.id;
      comment.replyingTo = this.replyHost.user.username;
      this.dataService.addCommentByParentReply(host,comment);
      this.open = false;

    }


  }

  ngOnInit(): void {

    this.subscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });

    this.replyMessage = `@${this.replyHost.user.username}`;

  }

  /**
   * Handles the key down event of the textarea. If the pressed key is the Backspace or Delete key
   * and the selection end position is less than or equal to the length of the prefix specified in
   * 'myText', the event is prevented to prevent the deletion of the prefix.
   *
   * @param event The keyboard event object
   */

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      const cursorPosition = this.myTextarea.nativeElement.selectionStart;
      const prefix = this.replyMessage;

      if (cursorPosition === prefix.length) {
        event.preventDefault();
        this.myTextarea.nativeElement.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
