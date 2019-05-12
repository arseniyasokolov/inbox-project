import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { TosterModule } from 'core-library/toster/toster.module';
import { LoaderModule } from 'core-library/loader/loader.module';
import { CabinetModule } from './cabinet/cabinet.module';

// components
import { AppComponent } from './app.component';

const coreModules = [
  BrowserModule,
  TosterModule,
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
