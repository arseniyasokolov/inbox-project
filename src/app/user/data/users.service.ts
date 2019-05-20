import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MockAndSlowApi, ApiServices } from '../../data/mock-and-slow.api';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    private _externalServer: MockAndSlowApi
  ) {

  }

  public getUsers(): Observable<UserModel[]> {
    return this._externalServer.getItems(ApiServices.Users).pipe(first());
  }


  public deleteUser(id: string): Observable<void> {
    return this._externalServer.deleteDataItem(ApiServices.Users, id);
  }

}
