import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UsersService } from './data/users.service';

@NgModule({
  declarations: [UserComponent],
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
