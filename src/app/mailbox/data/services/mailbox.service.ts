import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { MockAndSlowApi, ApiServices } from '../../../data/mock-and-slow.api';
import { MailItemModel } from '../models/mail-item.model';

@Injectable()
export class MailboxService {

    constructor(
        private _externalServer: MockAndSlowApi
    ) {

    }

    public getItems(): Observable<MailItemModel[]> {
        return this._externalServer.getItems(ApiServices.Mails).pipe(first());
    }

    /** Выдает только последние письма, начиная с переданного id. Повторяет запрос с опр. интервалом. */
    public getLastItems(getLastId: () => string): Observable<MailItemModel[]> {
        return interval(3000).pipe(
            switchMap(() => this._externalServer.getItems(ApiServices.Mails, getLastId()).pipe(first()))
        );
    }

    public deleteItem(id: string): Observable<void> {
        return this._externalServer.deleteDataItem(ApiServices.Mails, id);
    }

}