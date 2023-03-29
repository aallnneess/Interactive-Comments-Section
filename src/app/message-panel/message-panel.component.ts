import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from "../common/comment";
import {UserService} from "../user.service";
import {User} from "../common/user";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.css']
})
export class MessagePanelComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  currentUser!: User;

  @Input() image!: string;
  @Input() comment!: Comment;
  replays = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    public userService: UserService,
    private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.comments$.subscribe(() => {
      this.replays = this.comment.replies.length;
    });

    this.subscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });


    // Manually trigger change detection after updating the value
    this.cdr.detectChanges();
  }

  isCurrentUser(){
    return this.comment.user.username === this.currentUser.username;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
