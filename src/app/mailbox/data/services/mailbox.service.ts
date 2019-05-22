import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { ApiAdapterService, ApiServices } from '../../../data/api-adapter.service';
import { IMailItemModel } from '../models/mail-item.model';

@Injectable()
export class MailboxService {

    constructor(
        private _apiAdapterServer: ApiAdapterService
    ) {

    }

    public getItems(): Observable<IMailItemModel[]> {
        return this._apiAdapterServer.getItems<IMailItemModel>(ApiServices.Mails).pipe(first());
    }

    /** Выдает только последние письма, начиная с переданного id. Повторяет запрос с опр. интервалом. */
    public getLastItems(getLastId: () => string): Observable<IMailItemModel[]> {
        return interval(3000).pipe(
            switchMap(() => this._apiAdapterServer.getItems<IMailItemModel>(ApiServices.Mails, getLastId()).pipe(first()))
        );
    }

    public deleteItem(id: string): Observable<void> {
        return this._apiAdapterServer.deleteDataItem(ApiServices.Mails, id);
    }

}