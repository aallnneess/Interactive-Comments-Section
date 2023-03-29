import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { ModalComponent } from './modal/modal.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { ReplyCommentComponent } from './reply-comment/reply-comment.component';
import {HttpClientModule} from "@angular/common/http";
import { DeleteEditButtonsComponent } from './delete-edit-buttons/delete-edit-buttons.component';
import { UpDownVoteComponent } from './up-down-vote/up-down-vote.component';
import { ReplyButtonComponent } from './reply-button/reply-button.component';
import { ReplyPanelComponent } from './reply-panel/reply-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagePanelComponent,
    ModalComponent,
    AddCommentComponent,
    UpdateCommentComponent,
    ReplyCommentComponent,
    DeleteEditButtonsComponent,
    UpDownVoteComponent,
    ReplyButtonComponent,
    ReplyPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
