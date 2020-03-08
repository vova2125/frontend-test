import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAcceptEmitter } from '../table-crud-form/table-crud-form.component';

export enum TABLE_MODE {
  ROW_MODE,
  COLUMN_MODE
}

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent {
  @Input() deleteDisable = true;

  @Input()
  set fieldNames(config) {
    this.fieldNameList = Object.values(config.map(configItem => configItem.field));
  }

  @Output() handleDeleteRow: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleAddNewRow: EventEmitter<IAcceptEmitter> = new EventEmitter<IAcceptEmitter>();

  readonly tableModeConst = TABLE_MODE;
  isAddFormVisible = false;
  fieldNameList: string[];
  tableMode: number;

  handleDelete(): void {
    this.handleDeleteRow.emit();
  }

  handleAdd(editMode): void {
    this.isAddFormVisible = true;
    this.tableMode = editMode;
  }

  handleCancel(): void {
    this.isAddFormVisible = false;
  }

  handleAccept(value): void {
    this.handleAddNewRow.emit({ ...value, mode: this.tableMode });
    this.isAddFormVisible = false;
  }
}
