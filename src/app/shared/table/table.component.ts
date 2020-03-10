import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { IOrder } from '../../utils/order-mock';

export interface ITableConfig {
  field: string;
  title: string;
  id: string;
}

export enum ADDITIONAL_TABLE_INFO {
  NONE = 0,
  SUM = 1,
  MUL = 2
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: IOrder[] = [];
  @Input() config: ITableConfig[] = [];

  @Output() deleteTableRow: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteTableColumn: EventEmitter<string> = new EventEmitter<string>();
  @Output() addTableRow: EventEmitter<IAcceptEmitter> = new EventEmitter<IAcceptEmitter>();

  selectedRowId: number;
  additionalInfo: IOrder;
  additionalInfoStatus: number | null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tableService.getSelectedTableRowId()
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => this.selectedRowId = id);
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.handleAdditionalInfoProcess(this.additionalInfoStatus);
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

  handleAdditionalInfoProcess(additionalStatus: number): void {
    this.additionalInfoStatus = additionalStatus;
    switch (additionalStatus) {
      case ADDITIONAL_TABLE_INFO.SUM: {
        this.additionalInfo = sumInListInEachField(this.config, this.data);
        this.cdr.markForCheck();
        return;
      }
      case ADDITIONAL_TABLE_INFO.MUL: {
        this.additionalInfo = mulInListInEachField(this.config, this.data);
        this.cdr.markForCheck();
        return;
      }
      default:
        this.additionalInfo = null;
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
