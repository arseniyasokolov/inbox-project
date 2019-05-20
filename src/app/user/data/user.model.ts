import { PersonModel,  IPersonModel } from 'core-library/core/models/person.model';

export class UserModel extends PersonModel {

    public Email: string;
    public LatestEntryDate: Date;

    constructor(data: IUserModel) {
        super(data);
    }

    public fromData(data: IUserModel): void {
        super.fromData(data);
        this.Email = data.email;
        if (data.latestEntryDate)
            this.LatestEntryDate = new Date(data.latestEntryDate);
    }

}

export interface IUserModel extends IPersonModel {

    email: string;
    latestEntryDate: string;

}