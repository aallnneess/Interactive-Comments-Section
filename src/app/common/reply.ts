import {User} from "./user";

export class Reply {

  constructor(content: string, user: User, score: number) {
    console.log('add Reply');
    this.content = content;
    this.user = user;
    this.score = score;

    this.typ = 'reply';
  }

  id!: number;
  parentId!: number;
  content!: string;
  createdAt!: string;
  score!: number;

  user!: User;

  replyingTo = '';

  typ!: string;

}
