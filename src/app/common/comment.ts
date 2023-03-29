import {User} from "./user";
import {Reply} from "./reply";

export class Comment {

  constructor(content: string, user: User, score: number) {
    console.log('add Comment');
    this.content = content;
    this.user = user;
    this.score = score;

    this.typ = 'comment';
  }

  id!: number;
  content!: string;
  createdAt!: string;
  score!: number;

  user!: User;

  replies: Reply[] = [];
  typ!: string;

}
