import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { MockAndSlowApi } from '../../../data/mock-and-slow.api';
import { MailItemModel } from '../models/mail-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MailboxService {

    constructor(
        private _httpClient: HttpClient,
        private _externalServer: MockAndSlowApi
    ) {

    }

    public getItems(): Observable<MailItemModel[]> {
        return this._externalServer.getData().pipe(first());
    }

    /** Выдает только последние письма, начиная с переданного id. Повторяет запрос с опр. интервалом. */
    public getLastItems(getLastId: () => string): Observable<MailItemModel[]> {
        return interval(3000).pipe(
            switchMap(() => this._externalServer.getData(getLastId()).pipe(first()))
        );
    }

    public deleteItem(id: string): Observable<void> {
        return this._externalServer.deleteDataItem(id);
    }

}