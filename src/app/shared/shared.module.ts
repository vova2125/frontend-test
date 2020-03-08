import { NgModule } from '@angular/core';
import { TableModule } from './table/table.module';


@NgModule({
  imports: [
    TableModule
  ],
  exports: [TableModule],
})
export class SharedModule {
}
