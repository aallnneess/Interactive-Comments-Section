import {Injectable} from '@angular/core';
import {Data} from "./common/data";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {BehaviorSubject, filter} from "rxjs";
import {Comment} from "./common/comment";
import {Reply} from "./common/reply";

/*
The DataService class includes several methods for adding, updating, and deleting comments.
These methods manipulate the commentSubject$ BehaviorSubject, which holds an array of Comment objects
that is observed by the comments$ observable.

The addComment() method adds a new comment to the array of comments, generates a new ID for the comment,
and updates the commentSubject$ BehaviorSubject with the new array of comments.

The updateComment() method updates an existing comment in the array of comments, and also updates any replies
to that comment. The method takes an optional comments argument, which defaults to the current array of comments.

The addCommentByParentComment() method adds a new reply to an existing comment, and generates a new ID for the reply.
The method takes a parentComment argument, which is the comment to which the reply should be added,
and an optional comments argument, which defaults to the current array of comments.

The deleteComment() method removes a comment from the array of comments, and also removes any replies to that comment.
The method takes a toDelete argument, which is the comment to be deleted, and an optional comments argument,
which defaults to the current array of comments.
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private commentSubject$ = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentSubject$.asObservable().pipe(
    filter(commets => commets.length !== 0)
  );

  // Initialize a new ID for comments (fake implementation)
  newId = 4;

  constructor(
    private http: HttpClient,
    private userService: UserService) {

    // Make an HTTP request to a JSON file containing comments data
    this.http.get<Data>('assets/data.json').subscribe(data => {

      // Process the comments data by setting their parent IDs and log the results
      data.comments.forEach(comment => {
        comment.typ = 'comment';
        comment.replies.forEach(child => {
          child.parentId = comment.id;
          child.typ = 'reply'
        });

        if (comment.replies.length > 0) {
          comment.replies = this.sortReplysByScore(comment.replies);

        }
      });

      this.commentSubject$.next(this.sortCommentsByScore(data.comments));

      this.userService.setUser(data.currentUser);
    });
  }

  // Add a comment to the Behavior Subject
  addComment(comment: Comment) {
    // Set a fake created time for the comment
    comment.createdAt = '1 minute ago';

    // Get the current comments array from the Behavior Subject and add the new comment with a new ID
    let tmpComments = this.commentSubject$.getValue();
    tmpComments.push(this.addId(comment));
    this.commentSubject$.next(tmpComments);
  }

  // Assign a new ID to a comment and return it
  addId(comment: Comment) {
    this.newId++;
    comment.id = this.newId;
    return comment;
  }

  // Assign a new ID to a comment and return it
  addReplyId(comment: Reply) {
    this.newId++;
    comment.id = this.newId;
    return comment;
  }

  // Update a comment by ID and return the updated comments array
  updateComment(toUpdate: (Comment | Reply), comments = this.commentSubject$.getValue()) {

    let newComments!: Comment[];

    if (toUpdate instanceof Comment) {
      console.log('instance worked');

      newComments = comments.map(c => {

        if (c.id === toUpdate.id) {
          c = toUpdate;
        }
        return c;
      });

    } else {
      newComments = comments.map(c => {

        if (c.id === toUpdate.parentId) {
          c.replies[c.replies.indexOf(toUpdate)].content = toUpdate.content;
        }

        return c;
      });
    }

    this.commentSubject$.next(newComments);
  }

  // Add a reply comment to a parent comment and return the updated comments array
  addCommentByParentComment(toAdd: Comment, reply: Reply, comments = this.commentSubject$.getValue()) {

    const newComments = comments.map(comment => {
      if (comment === toAdd) {
        comment.replies.push(this.addReplyId(reply));
      }
      return comment;
    });

    this.commentSubject$.next(newComments);
  }

  // Add a reply comment to a parent comment and return the updated comments array
  addCommentByParentReply(toAdd: Reply, reply: Reply, comments = this.commentSubject$.getValue()) {

    const newComments = comments.map(comment => {

      if (comment.id === toAdd.parentId) {
        comment.replies.push(this.addReplyId(reply));
      }
      return comment;
    });

    this.commentSubject$.next(newComments);
  }


  // Delete a comment and return the updated comments array
  delete(toDelete: (Comment | Reply), comments = this.commentSubject$.getValue()) {

    if (toDelete instanceof Comment) {
      if (comments.indexOf(toDelete) !== -1) {
        comments.splice(comments.indexOf(toDelete), 1);
        return;
      }
    } else {
      comments.map(comment => {
        if (comment.id === toDelete.parentId) {
          comment.replies.splice(comment.replies.indexOf(toDelete), 1);
          return;
        }
      });
    }
  }

  sortCommentsByScore(array: Comment[]) {
    return array.sort((a, b) => b.score - a.score);
  }

  sortReplysByScore(array: Reply[]) {
    return array.sort((a, b) => b.score - a.score);
  }

  checkScores(toCheck: Comment | Reply) {

    console.log('check score');


     if (toCheck.typ === 'comment') {

       console.log('its a comment');

        // its a Comment Typ...
        this.commentSubject$.next(this.sortCommentsByScore(this.commentSubject$.getValue()));
      } else {
       console.log('its a reply');
       const reply = toCheck as Reply;
        this.findParentArray(reply.parentId, this.commentSubject$.getValue());
      }
    }



  findParentArray(parentId: number, array: Comment[]) {
    let found = false;

    // Find parent comment
    array.map(comment => {
      if (comment.id === parentId) {

        comment.replies = this.sortReplysByScore(comment.replies);
        console.log('found parent');
        found = true;
        return;
      }
    });

    if (!found) {
      // Parent must be a reply
      array.map(comment => {

        comment.replies.map(reply => {
          if (reply.id === parentId) {
            comment.replies = this.sortReplysByScore(comment.replies);
            found = true;
            return;
          }
        });

      });
    }

  }

}
