import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Importa también DialogService
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    CrudComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CrudRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule
  ],
  providers: [DialogService],
  exports: [
    CrudComponent,
  ],
})
export class CrudModule { }
