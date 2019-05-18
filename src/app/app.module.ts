import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { ModalsModule } from 'core-library/modals/modals.module';
import { LoaderModule } from 'core-library/loader/loader.module';
import { CabinetModule } from './cabinet/cabinet.module';

// components
import { AppComponent } from './app.component';
import { AuthorLogoComponent } from '../../core-library/core/components/author-logo/author-logo.component';

const coreModules = [
  BrowserModule,
  ModalsModule,
  LoaderModule,
];

const appModules = [
  CabinetModule.forRoot(),
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...coreModules,
    ...appModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
