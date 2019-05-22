import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiAdapterService, ApiServices } from '../../data/api-adapter.service';
import { UserModel, IUserModel } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    private _apiAdapterService: ApiAdapterService
  ) {
  }

  public getUsers(): Observable<UserModel[]> {
    return this._apiAdapterService.getItems<IUserModel>(ApiServices.Users).pipe(
      first(),
      map(items => items.map(i => new UserModel(i)))
    );
  }

  public getUserById(id: string): Observable<UserModel> {
    return this._apiAdapterService.getById<IUserModel>(ApiServices.Users, id).pipe(
      map(user => new UserModel(user))
    );
  }


  public deleteUser(id: string): Observable<void> {
    return this._apiAdapterService.deleteDataItem(ApiServices.Users, id);
  }

}
