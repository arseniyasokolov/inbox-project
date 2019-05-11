import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { MockAndSlowApi } from './mock-and-slow-api';
import { MailItemModel } from './mail-item.model';

@Injectable()
export class MailboxService {

    private _externalServer = new MockAndSlowApi();

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