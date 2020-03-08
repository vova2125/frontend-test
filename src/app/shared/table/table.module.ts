import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { TableService } from './services/table.service';
import { ButtonsModule } from 'ngx-bootstrap';
import { TableCrudFormComponent } from './table-crud-form/table-crud-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent,
    TableToolbarComponent,
    TableCrudFormComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    ReactiveFormsModule,
  ],
  providers: [TableService],
  exports: [TableComponent]
})
export class TableModule {
}
