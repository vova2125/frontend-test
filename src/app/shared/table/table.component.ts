import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { TableService } from './services/table.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IAcceptEmitter } from './table-crud-form/table-crud-form.component';
import { mulInListInEachField, sumInListInEachField } from './utils/util';

export interface ITableConfig {
  field: string;
  title: string;
  id: string;
}

export enum ADDITIONAL_TABLE_INFO {
  NONE,
  SUM,
  MUL
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data = [];
  @Input() config: ITableConfig[] = [];
  @Input() isShowAdditionalInfo = ADDITIONAL_TABLE_INFO.NONE;

  @Output() deleteTableRow: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteTableColumn: EventEmitter<string> = new EventEmitter<string>();
  @Output() addTableRow: EventEmitter<IAcceptEmitter> = new EventEmitter<IAcceptEmitter>();

  selectedRowId: number;
  additionalInfo: { key: string };

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private tableService: TableService) {
  }

  ngOnInit(): void {
    this.tableService.getSelectedTableRowId()
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => this.selectedRowId = id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.isShowAdditionalInfo) {
      switch (this.isShowAdditionalInfo) {
        case ADDITIONAL_TABLE_INFO.SUM: {
          this.additionalInfo = sumInListInEachField(this.config, this.data);
          return;
        }
        case ADDITIONAL_TABLE_INFO.MUL: {
          this.additionalInfo = mulInListInEachField(this.config, this.data);
          return;
        }
      }

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectRow(id: number): void {
    this.tableService.setSelectedTableRowId(id);
  }

  handleDelete(): void {
    this.deleteTableRow.emit(this.selectedRowId);
  }

  handleDeleteColumn(id): void {
    this.deleteTableColumn.emit(id);
  }

  handleAdd(value): void {
    this.addTableRow.emit(value);
  }

  trackByFn(index) {
    return index;
  }
}
