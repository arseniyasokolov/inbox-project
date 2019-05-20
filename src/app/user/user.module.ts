import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersService } from './data/user.service';

@NgModule({
  declarations: [UserCardComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        UsersService
      ]
    }
  }
}
