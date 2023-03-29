import {Component, Input} from '@angular/core';
import {Comment} from "../common/comment";
import {DataService} from "../data.service";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-up-down-vote',
  templateUrl: './up-down-vote.component.html',
  styleUrls: ['./up-down-vote.component.css']
})
export class UpDownVoteComponent {

  @Input() comment!: (Comment | Reply);


  constructor(private dataService: DataService) {
  }

  upvote() {
    this.comment.score = this.comment.score + 1;
    this.dataService.checkScores(this.comment);
  }

  downvote() {
    this.comment.score = this.comment.score - 1;
    this.dataService.checkScores(this.comment);
  }

}
