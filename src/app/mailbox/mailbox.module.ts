import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TosterModule } from 'core-library/toster/toster.module';
import { LoaderModule } from 'core-library/loader/loader.module';

import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailListItemComponent } from './components/mail-list/mail-list-item/mail-list-item.component';
import { MailboxService } from './data/services/mailbox.service';

@NgModule({
    declarations: [
        MailListComponent,
        MailListItemComponent,
    ],
    exports: [
        MailListComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        LoaderModule,
        TosterModule
    ]
})
export class MailboxModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MailboxModule,
            providers: [
                MailboxService,
            ]
        }
    }

}
