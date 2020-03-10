import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAcceptEmitter } from '../table-crud-form/table-crud-form.component';
import { ADDITIONAL_TABLE_INFO } from '../table.component';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export enum TABLE_MODE {
  ROW_MODE,
  COLUMN_MODE
}

export const TABLE_ADDITIONAL_LIST_STATUSES = [
  {
    value: ADDITIONAL_TABLE_INFO.NONE,
    label: 'None'
  },
  {
    value: ADDITIONAL_TABLE_INFO.SUM,
    label: 'Addition'
  },
  {
    value: ADDITIONAL_TABLE_INFO.MUL,
    label: 'Multiplication'
  },
];

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableToolbarComponent implements OnInit, OnDestroy {
  @Input() deleteDisable = true;

  @Input()
  set fieldNames(config) {
    this.fieldNameList = Object.values(config.map(configItem => configItem.field));
  }

  @Output() handleDeleteRow: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleAddNewRow: EventEmitter<IAcceptEmitter> = new EventEmitter<IAcceptEmitter>();
  @Output() handleChangeAdditionalStatus: EventEmitter<ADDITIONAL_TABLE_INFO> = new EventEmitter<ADDITIONAL_TABLE_INFO>();

  readonly tableModeConst = TABLE_MODE;
  readonly tableAdditionalListStatuses = TABLE_ADDITIONAL_LIST_STATUSES;
  isAddFormVisible = false;
  fieldNameList: string[];
  tableMode: number;
  additionalInfoControl = new FormControl(ADDITIONAL_TABLE_INFO.NONE);

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.handleChangesOfAdditionalControl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleChangesOfAdditionalControl(): void {
    this.additionalInfoControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.handleChangeAdditionalStatus.emit(Number(value)));
  }

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
    this.handleAddNewRow.emit({
      ...value,
      mode: this.tableMode
    });
    this.isAddFormVisible = false;
  }
}
