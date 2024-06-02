import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CarService } from '../../../../core/services/car.service';
import { addCar, removeCar } from '../../../../app/store/actions/car.actions';
import { selectAllCars } from '../../../../app/store/selectors/car.selectors';
import { Store, select } from '@ngrx/store';
import { Car } from '../../../../core/models/car.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  cars: Car[] = [];
  displayDialog: boolean = false;
  selectedCar: Car = { id: -1, model: '', brand: '' };
  form: FormGroup = new FormGroup('');

  constructor(
    private carService: CarService,
    private formBuilder?: FormBuilder,
    private primengConfig?: PrimeNGConfig,
    private store?: Store<{ cars: Car[] }>
  ) { }

  ngOnInit() {
    this.primengConfig!.ripple = true;
    this.createForm();
    this.getCars();
  }

  createForm() {
    if (this.formBuilder) {
      this.form = this.formBuilder.group({
        txBrand: new FormControl('', Validators.required),
        txModel: new FormControl('', Validators.required),
        txFilteredBrand: new FormControl('')
      });
    }
  }

  getCars() {
    this.carService.getAll().subscribe(
      {
        next: (res) => {
          this.cars = res;
          res.forEach(element => {
            this.store!.dispatch(addCar({ car: element }));
          });
          this.store!.pipe(select(selectAllCars)).subscribe(res => {
            console.log('Cars from store => ', res);
          });
        },
        error: (err) => {
          console.error(err)
        }
      }

    );
  }

  showOrHideDialog(show: boolean) {
    this.selectedCar = { id: -1, model: '', brand: '' };
    this.txBrand.setValue('');
    this.txModel.setValue('');

    this.displayDialog = show;
  }

  showDialogToEdit(car: Car) {
    this.selectedCar = { ...car };
    this.txBrand.setValue(car.brand);
    this.txModel.setValue(car.model);
    this.displayDialog = true;
  }

  saveCar() {
    if (this.selectedCar.id === -1) {
      this.carService.create({
        brand: this.txBrand.value,
        model: this.txModel.value
      }).subscribe({
        next: (res) => {
          if (res) {
            this.getCars();
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
    } else {
      this.carService.edit({
        id: this.selectedCar.id,
        brand: this.txBrand.value,
        model: this.txModel.value
      }).subscribe({
        next: (res) => {
          if (res) {
            this.getCars();
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    this.showOrHideDialog(false);
  }

  deleteCar(id: number) {
    this.carService.delete(id).subscribe({
      next: (res) => {
        if (res) {
          this.store!.dispatch(removeCar({ id: id.toString() }));
          this.getCars();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get carsFiltered() {
    return this.cars.filter(car => car.brand.toLowerCase().includes(this.txFilteredBrand.value.toLowerCase()));
  }

  get txBrand(): FormControl {
    return this.form?.get('txBrand') as FormControl;
  }

  get txModel(): FormControl {
    return this.form?.get('txModel') as FormControl;
  }

  get txFilteredBrand(): FormControl {
    return this.form?.get('txFilteredBrand') as FormControl;
  }
}