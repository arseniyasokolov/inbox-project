import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { first, finalize } from 'rxjs/operators';
import { TosterGlobalService } from 'core-library/modals/data/toster/toster.global.service';
import { TosterTypes } from 'core-library/modals/data/toster/toster-types.enum';

import { MailItemViewModel } from '../../view-models/mail-item.view-model';
import { MailboxService } from '../../data/services/mailbox.service';
import { IMailItemModel } from '../../data/models/mail-item.model';
import { UsersService as UserService } from 'src/app/user/data/user.service';

@Component({
  selector: 'mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./styles/mail-list.component.master.scss']
})

export class MailListComponent implements OnInit {

  public get Items(): MailItemViewModel[] {
    if (this._items)
      return this._items.reverse();
  }

  private _items: MailItemViewModel[];

  constructor(
    private _dataService: MailboxService,
    private _userService: UserService,
    private _tosterService: TosterGlobalService
  ) {
  }

  public ngOnInit() {
    this.initialize();
    this._userService.getUsers().subscribe(users=> console.log(users));
  }

  public deleteItem(item: MailItemViewModel) {
    item.markOnDelete(true);
    this._dataService.deleteItem(item.Id)
      .pipe(
        first(),
        finalize(() => item.markOnDelete(false))
      ).subscribe(() => {
        const deletingIndex = this._items.findIndex(i => i.Id === item.Id);
        if (deletingIndex > -1)
          this._items.splice(deletingIndex, 1);
      }, () =>
          this._tosterService.showModal({ type: TosterTypes.Error, message: 'Письмо не удалено', time: 50000 })
      );
  }

  private initialize() {
    this._dataService.getItems().subscribe(items => {
      this._items = this.createItems(items);
      this.subscribeNewItems();
    });
  }

  private subscribeNewItems() {
    const getLastItemId = () => this._items && this._items.length ? this._items[this._items.length - 1].Id : undefined;
    this._dataService.getLastItems(getLastItemId).subscribe(lastItems => {
      this._items.push(...this.createItems(lastItems));
    });
  }

  private createItems(items: IMailItemModel[]): MailItemViewModel[] {
    return items.map(item => {
      const viewModel = new MailItemViewModel();
      viewModel.fromModel(item);
      return viewModel;
    });
  }

}