import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { TosterGlobalService } from 'core-library/modals/data/toster/toster.global.service';
import { TosterTypes } from 'core-library/modals/data/toster/toster-types.enum';
import { ITosterInitializeData } from 'core-library/modals/data/toster/toster-initialize-data';
import { MailItemViewModel } from '../../../view-models/mail-item.view-model';

@Component({
  selector: 'mail-list-item',
  templateUrl: './mail-list-item.component.html',
  styleUrls: ['./styles/mail-list-item.component.master.scss']
})

export class MailListItemComponent implements OnInit, OnDestroy {

  @Input()
  public model: MailItemViewModel;

  @Output()
  public onDelete = new EventEmitter<void>();

  private _lifeTime: number;

  constructor(private _tosterService: TosterGlobalService) {

  }

  public ngOnInit() {
    this._lifeTime = performance.now();
  }

  public ngOnDestroy() {
    this.showDeleteMessage();
  }

  public deleteItem() {
    this.onDelete.emit();
  }

  private showDeleteMessage() {
    const lifeTime: number = Math.round((performance.now() - this._lifeTime) / 1000);
    const modalData: ITosterInitializeData = {
      message: `Письмо пролежало в ящике ${lifeTime} сек!`,
      type: TosterTypes.Success
    };
    this._tosterService.showModal(modalData);
  }

}
