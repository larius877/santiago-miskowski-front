import { createAction, props } from '@ngrx/store';
import { Car } from 'src/core/models/car.model';

export const addCar = createAction('[Car] Add Car', props<{ car: Car }>());
export const removeCar = createAction('[Car] Remove Car', props<{ id: string }>());
