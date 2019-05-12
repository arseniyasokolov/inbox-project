import { Component, OnInit } from '@angular/core';
import { MailItemViewModel } from '../../view-models/mail-item.view-model';
import { MailboxService } from '../../data/services/mailbox.service';
import { MailItemModel } from '../../data/models/mail-item.model';

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
    private _dataService: MailboxService
  ) {
  }

  public ngOnInit() {
    this.initialize();
  }

  public deleteItem(id: string) {
    this._dataService.deleteItem(id).subscribe(() => {
      const deletingIndex = this._items.findIndex(i => i.Id === id);
      if (deletingIndex > -1)
        this._items.splice(deletingIndex, 1);
    });
  }

  private initialize() {
    this._dataService.getItems().subscribe(items => {
      this._items = this.createItems(items);
      // this.subscribeNewItems();
    });
  }

  private subscribeNewItems() {
    const getLastItemId = () => this._items && this._items.length ? this._items[this._items.length - 1].Id : undefined;
    this._dataService.getLastItems(getLastItemId).subscribe(lastItems => {
      this._items.push(...this.createItems(lastItems));
    });
  }

  private createItems(items: MailItemModel[]): MailItemViewModel[] {
    return items.map(item => {
      const viewModel = new MailItemViewModel();
      viewModel.fromModel(item);
      return viewModel;
    });
  }

}