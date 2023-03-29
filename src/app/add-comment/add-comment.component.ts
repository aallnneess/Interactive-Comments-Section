import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Comment} from "../common/comment";
import {UserService} from "../user.service";
import {User} from "../common/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy{

  @Input() image!: string;

  private currentUser!: User;

  subscription!: Subscription;


  constructor(
    private dataService: DataService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  sendComment(value: string) {
    let comment = new Comment(value,this.currentUser, 0);
    this.dataService.addComment(comment);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
