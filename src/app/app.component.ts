import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {User} from "./common/user";
import {UserService} from "./user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  subscription!: Subscription;
  currentUser!: User;

  constructor(
    public dataService: DataService,
    public userService: UserService) {
  }

  ngOnInit(): void {

    this.subscription = this.userService.user$.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
