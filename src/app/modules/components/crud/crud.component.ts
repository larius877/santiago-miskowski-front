import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CarService } from 'src/core/services/car.service';
import { addCar, removeCar } from 'src/app/store/actions/car.actions';
import { selectAllCars } from 'src/app/store/selectors/car.selectors';
import { Store, select } from '@ngrx/store';
import { Car } from 'src/core/models/car.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  cars: Car[] = [];
  displayDialog: boolean = false;
  selectedCar: Car = {id: -1, model: '', brand: ''};
  filteredBrand: string = "";

  constructor(
    private carService: CarService,
    private primengConfig?: PrimeNGConfig, 
    private store?: Store<{ cars: Car[] }>) {}

  ngOnInit() {
    this.primengConfig!.ripple = true;
    this.getCars();
  }

  getCars() {
    this.carService.getAll().subscribe(res => {
      this.cars = res;
      res.forEach(element => {
        this.store!.dispatch(addCar({ car: element }));
      });
      this.store!.pipe(select(selectAllCars)).subscribe(res => {
        console.log('Cars from store => ', res);
      });
    });
  }

  showOrHideDialog(show: boolean) {
    this.selectedCar = {id: -1, model: '', brand: ''};
    this.displayDialog = show;
  }

  showDialogToEdit(car: Car) {
    this.selectedCar = { ...car };
    this.displayDialog = true;
  }

  saveCar() {
    if (this.selectedCar.id === -1) {
      this.carService.create({
        brand: this.selectedCar.brand,
        model: this.selectedCar.model
      }).subscribe(res => {
        if(res) {
          this.getCars();
        }
      })
    } else {
      const index = this.cars.findIndex(car => car.id === this.selectedCar.id);
      this.cars[index] = { ...this.selectedCar };
      this.carService.edit({
        id: this.selectedCar.id,
        model: this.selectedCar.model,
        brand: this.selectedCar.brand
      }).subscribe(res => {
        if(res) {
          this.getCars();
        }
      })
    }
    this.showOrHideDialog(false);
  }

  onPageChange(evt: any) {

  }

  deleteCar(id: number) {
   this.carService.delete(id).subscribe(res => {
    if(res) {
      this.store!.dispatch(removeCar({id: id.toString()}));
      this.getCars();
    }
   });
  }

  get carsFiltered() {
    return this.cars.filter(car => car.brand.toLowerCase().includes(this.filteredBrand.toLowerCase()));
  }
}