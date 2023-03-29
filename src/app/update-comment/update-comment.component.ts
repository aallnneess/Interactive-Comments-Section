import {Component, Input} from '@angular/core';
import {Comment} from "../common/comment";
import {DataService} from "../data.service";
import {Reply} from "../common/reply";

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent {

  @Input() image!: string;

  @Input() open = false;

  @Input() toUpdate!: (Comment | Reply);


  constructor(private dataService: DataService) {
  }

  updateComment(value: string) {

    this.toUpdate.content = value;
    this.dataService.updateComment(this.toUpdate);

    this.open = false;

  }
}
