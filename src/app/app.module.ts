import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoaderComponent } from 'core-library/loader/loader.component';
import { TosterModule } from 'core-library/toster/toster.module';
import { TosterGlobalService } from 'core-library/toster/data/toster.global.service';

import { AppComponent } from './app.component';
import { MailboxService } from './data/mailbox.service';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailListItemComponent } from './mail-list-item/mail-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailListItemComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    TosterModule
  ],
  providers: [
    MailboxService,
    TosterGlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
