import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { ModalsModule } from 'core-library/modals/modals.module';
import { LoaderModule } from 'core-library/loader/loader.module';
import { CabinetModule } from './cabinet/cabinet.module';
import { UserModule } from './user/user.module';

// components
import { AppComponent } from './app.component';

const coreModules = [
  BrowserModule,
  ModalsModule,
  LoaderModule,
];

const appModules = [
  CabinetModule.forRoot(),
  UserModule.forRoot()
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
