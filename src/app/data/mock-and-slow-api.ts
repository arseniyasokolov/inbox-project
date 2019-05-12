import { Observable, timer, of, interval, BehaviorSubject } from 'rxjs';
import { switchMap, mapTo, repeat, map, first, filter } from 'rxjs/operators';
import { Helpers } from 'core-library/common/helpers';
import { Color } from 'core-library/common/color.model';

/** Имитация API */
export class MockAndSlowApi {

    private _dataCache = new BehaviorSubject<any[]>(null);

    constructor() {
        this.createPipeWithRandomInterval(this.createDataItemsPair, 3000, 5000)
            .subscribe((dataItemsPair: any[]) => {
                const items = this._dataCache.getValue() ? [...this._dataCache.getValue()] : [];
                items.push(...dataItemsPair);
                this._dataCache.next(items);
            });
    }

    public getData(lastId?: string): Observable<any[]> {
        return this._dataCache.pipe(
            filter(items => !!items),
            map(items => {
                if (!lastId)
                    return items;
                const index = items.findIndex(i => i.id === lastId);
                return index > -1 ? items.slice(index + 1) : [];
            })
        );
    }

    public deleteDataItem(id: string): Observable<void> {
        if (!id)
            return Observable.throw('Не указан Id');
        return new Observable(subscriber => {
            interval(1000).pipe(first()).subscribe(() => { // задержка для имитации работы сервера
                this._dataCache.next(this._dataCache.getValue().filter(i => i.id !== id));
                subscriber.next();
                subscriber.complete();
            });
        });
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
            title: `Письмо о цвете ${randomColor.Color}`,
            message: `Цвет ${randomColor.Color} обладает удивительными свойствами...` +
                ` А если его инвертировать, получится ${randomColor.Inverted}.`,
            timestamp: new Date(),
            senderId: Helpers.getGuid(),
        };
    }

}