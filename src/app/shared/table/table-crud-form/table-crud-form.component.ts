import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TABLE_MODE } from '../table-toolbar/table-toolbar.component';

export interface IAcceptEmitter {
  mode: TABLE_MODE;
  value: { key: string };
}

export const HEADER_FIELD = ['field', 'title'];

@Component({
  selector: 'app-table-crud-form',
  templateUrl: './table-crud-form.component.html',
  styleUrls: ['./table-crud-form.component.scss']
})
export class TableCrudFormComponent implements OnInit {
  @Input() fieldNameList: string[];
  @Input() mode: TABLE_MODE;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() accept: EventEmitter<IAcceptEmitter> = new EventEmitter<IAcceptEmitter>();

  fieldGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    if (this.mode === TABLE_MODE.COLUMN_MODE) {
      this.fieldNameList = HEADER_FIELD;
    }

    this.fieldGroup = this.fb.group({});
    this.fieldNameList.forEach(fieldName => {
      this.fieldGroup.addControl(fieldName, new FormControl('', [Validators.required]));
    });
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  handleAccept(): void {
    this.accept.emit({ mode: this.mode, value: this.fieldGroup.value });
  }
}
