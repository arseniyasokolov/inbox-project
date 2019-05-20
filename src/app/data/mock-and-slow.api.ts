import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer, of, interval, BehaviorSubject, concat, pipe } from 'rxjs';
import { switchMap, mapTo, repeat, map, first, flatMap } from 'rxjs/operators';
import { Helpers } from 'core-library/core/helpers';
import { Color } from 'core-library/core/models/color.model';

const Constants = {
    port: '4100',
};

@Injectable({
    providedIn: "root"
})
/** Имитация API */
export class MockAndSlowApi {

    private _dataCache = new BehaviorSubject<any[]>(null);

    constructor(private _httpClient: HttpClient) {
        this.createPipeWithRandomInterval(this.createDataItemsPair, 7000, 10000)
            .subscribe((dataItemsPair: any[]) => {
                dataItemsPair.forEach(item => this._httpClient.post(`http://localhost:${Constants.port}/${Constants.mailsRest}`, item).subscribe());
            });
    }

    public getItems(service: ApiServices, lastId?: string): Observable<any[]> {
        return this._httpClient.get<any[]>(`http://localhost:${Constants.port}/${service.toLowerCase()}`).pipe(map(items => {
            if (!lastId)
                return items;
            const index = items.findIndex(i => i.id === lastId);
            return index > -1 ? items.slice(index + 1) : [];
        }));
    }

    public deleteDataItem(service: ApiServices, id: string): Observable<void> {
        if (!id)
            return Observable.throw('Не указан Id');
        return interval(1000).pipe(
            first(),
            switchMap(() => this._httpClient.delete(`http://localhost:${Constants.port}/${service.toLowerCase()}/${id}`).pipe(
                flatMap(() => of(null))
            ))
        )
    }

    /** Создает поток, в котором повторяется результат переданного коллбэка с произвольной паузой
     * @param min нижняя граница для паузы
     * @param max верхняя граница для паузы
     */
    private createPipeWithRandomInterval(callback: () => {}, min: number, max: number): Observable<any> {
        const getRandom = () => Helpers.getRandomInt(Math.round(min / 1000), Math.round(max / 1000)) * 1000;
        return of('').pipe(
            switchMap(() => timer(getRandom()).pipe(mapTo(callback.apply(this)))),
            repeat()
        );
    }

    /** Имитация одновременного создания item */
    private createDataItemsPair(): any[] {
        const res = [this.createDataItem()];
        return Helpers.checkPropability(0.3) ? res.concat(this.createDataItem()) : res;
    }

    private createDataItem(): any {
        const randomColor: Color = new Color().getRandom();
        return {
            id: Helpers.getGuid(),
            title: `Шлю тебе письмо о цвете ${randomColor.Color}`,
            message: `Мой юный друг, цвет ${randomColor.Color} обладает удивительными свойствами...` +
                ` А если его инвертировать, получится ${randomColor.Inverted}.`,
            timestamp: new Date(),
            senderId: Helpers.getGuid(),
        };
    }

}

export enum ApiServices {
    Mails = 'Mails',
    Users = 'Users'
}