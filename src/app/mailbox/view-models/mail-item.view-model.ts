import { Helpers } from 'core-library/core/helpers';
import { IMailItemModel } from '../data/models/mail-item.model';

export class MailItemViewModel {

    public Title: string;
    public Message: string;
    // public Sender: UserModel; /** TO DO: встроить в приложение модуль пользователей */
    public get Id(): string {
        return this._id;
    }
    public get Time(): string {
        return this._time;
    }
    /** Письмо в процессе удаления */
    public get IsDeleting() {
        return this._isDeleting;
    }
    /** Снимок изначальных данных */
    private _snapshot: IMailItemModel;
    private _id: string;
    private _time: string;
    private _isDeleting: boolean;

    constructor() {
    }

    public fromModel(data: IMailItemModel) {
        this._snapshot = data;
        this._id = data.id;
        this._time = Helpers.getFormattedDate(data.timestamp);
        this.Title = data.title;
        this.Message = data.message;
    }

    /** Помечает письмо, как находящееся в процессе удаления (или наоборот) */
    public markOnDelete(state: boolean) {
        this._isDeleting = state;
    }

}