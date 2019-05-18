import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { MailboxModule } from '../mailbox/mailbox.module';

import { AuthorLogoComponent } from 'core-library/core/components/author-logo/author-logo.component';
import { HeaderComponent } from './components/header/header.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AuthorLogoComponent,
    CabinetComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    MailboxModule.forRoot()
  ]
})
export class CabinetModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CabinetModule,
    }
  }

}
