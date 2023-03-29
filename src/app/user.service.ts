import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, shareReplay} from "rxjs";
import {User} from "./common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject$ = new BehaviorSubject<User>(new User());
  user$ = this.userSubject$.asObservable().pipe(
    filter(user => user.username !== ''),
    shareReplay()
  );

  constructor() { }

  setUser(user: User) {
    this.userSubject$.next(user);
  }

}
