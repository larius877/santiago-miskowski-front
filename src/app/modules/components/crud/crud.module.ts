import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnFilter, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'; // Importa ButtonModule
import { DialogService } from 'primeng/dynamicdialog'; // Agrega DialogService

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { CarService } from 'src/core/services/car.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/store/reducers/car.reducer';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    StoreModule.forFeature('cars', reducer),
  ],
  providers: [DialogService, CarService],
  exports: [CrudComponent]
})
export class CrudModule { }
