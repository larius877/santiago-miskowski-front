import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CrudRoutingModule } from './crud-routing.module';
import { CarService } from 'src/core/services/car.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/store/reducers/car.reducer';
import { PaginatorModule } from 'primeng/paginator';
import { CrudComponent } from './components/crud.component';

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
    ReactiveFormsModule,
    StoreModule.forFeature('cars', reducer),
  ],
  providers: [DialogService, CarService],
  exports: [CrudComponent]
})
export class CrudModule { }
