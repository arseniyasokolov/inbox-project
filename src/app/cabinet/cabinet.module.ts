import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { MailboxModule } from '../mailbox/mailbox.module';

import { HeaderComponent } from './components/header/header.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';

@NgModule({
  declarations: [
    CabinetComponent,
    HeaderComponent,
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
