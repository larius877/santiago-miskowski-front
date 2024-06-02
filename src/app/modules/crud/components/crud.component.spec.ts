import { Car } from 'src/core/models/car.model';
import { CrudComponent } from './crud.component';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarService } from '../../../../core/services/car.service';
import { Store } from '@ngrx/store';

const mockCreate = jest.fn(() => of(true));
const mockEdit = jest.fn(() => of(true));
const mockDelete = jest.fn(() => of(true));
const mockGetAll = jest.fn((): Observable<Car[]> => of());

describe('CrudComponent', () => {
    let component: CrudComponent;
    let componentFixture: ComponentFixture<CrudComponent>;
    let formBuilder: FormBuilder;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrudComponent],
            providers: [FormBuilder, {
                provide: CarService, useValue: {
                    create: mockCreate,
                    edit: mockEdit,
                    delete: mockDelete,
                    getAll: mockGetAll
                },
            }, {
                provide: Store, useValue: { }
            }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents()
        componentFixture = await TestBed.createComponent(CrudComponent);
        component = componentFixture.componentInstance;
        formBuilder = TestBed.inject(FormBuilder);
        component.form = formBuilder.group({
            txBrand: new FormControl('Actual brand'),
            txModel: new FormControl('Actual model')
        })
        componentFixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should add a new car and call create method of carService', () => {
        const car: Car = { model: 'Actual model', brand: 'Actual brand' };
        component.selectedCar.id = -1;
        mockCreate.mockReturnValueOnce(of(true));
        mockGetAll.mockReturnValueOnce(of([{...car, id: 1}]))
        component.saveCar();
        expect(mockCreate).toHaveBeenCalledWith({ brand: component.form.controls['txBrand'].value, model: component.form.controls['txModel'].value });
        expect(component.cars).toContainEqual({ ...car, id: 1 });
    });

    it('should edit a car and call edit method of carService', () => {
        const car: Car = { id: 1, model: 'Actual model', brand: 'Actual brand' };
        component.selectedCar.id = 1;
        component.cars.push(car)
        component.saveCar();
        mockEdit.mockReturnValueOnce(of(true));
        mockGetAll.mockReturnValueOnce(of([]))
        expect(mockEdit).toHaveBeenCalledWith({id: 1,brand: component.form.controls['txBrand'].value, model: component.form.controls['txModel'].value });
        expect(component.cars).toContainEqual(car);
    });

    it('should delete a car and return empty car array', () => {
        mockDelete.mockReturnValueOnce(of(true));
        mockGetAll.mockReturnValueOnce(of([]));
        component.deleteCar(1);
        component.getCars();
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockGetAll).toHaveBeenCalledTimes(2);
        expect(component.cars.length).toEqual(0);
    });
});