import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../common/user";
import {UserService} from "../user.service";
import {DataService} from "../data.service";
import {Reply} from "../common/reply";
import {Comment} from "../common/comment";

@Component({
  selector: 'app-reply-panel',
  templateUrl: './reply-panel.component.html',
  styleUrls: ['./reply-panel.component.css']
})
export class ReplyPanelComponent implements OnInit, OnDestroy{

  subscription!: Subscription;
  currentUser!: User;

  @Input() image!: string;
  @Input() reply!: Reply;
  @Input() parentComment!: Comment;

  constructor(
    private cdr: ChangeDetectorRef,
    public userService: UserService) { }

  ngOnInit(): void {

    this.subscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });

    // Manually trigger change detection after updating the value
    this.cdr.detectChanges();
  }

  isCurrentUser(){
    return this.reply.user.username === this.currentUser.username;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
