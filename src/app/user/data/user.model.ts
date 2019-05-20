import { PersonModel, IPersonInitializeData } from 'core-library/core/models/person.model';

export class UserModel extends PersonModel {

    public LatestEntryDate: Date;

    constructor(data: IUserInitializeData) {
        super(data);
    }

    public fromData(data: IUserInitializeData): void {
        super.fromData(data);
        this.LatestEntryDate = new Date(data.latestEntryDate);
    }

}

export interface IUserInitializeData extends IPersonInitializeData {

    latestEntryDate: string;

}