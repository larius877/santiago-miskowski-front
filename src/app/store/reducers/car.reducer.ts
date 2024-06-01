import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as CarActions from '../actions/car.actions';
import { Car } from 'src/core/models/car.model';

export interface CarState extends EntityState<Car> {}

export const carAdapter = createEntityAdapter<Car>();

export const initialState: CarState = carAdapter.getInitialState();

const carReducer = createReducer(
  initialState,
  on(CarActions.addCar, (state, { car }) => carAdapter.addOne(car, state)),
  on(CarActions.removeCar, (state, { id }) => carAdapter.removeOne(id, state))
);

export function reducer(state: CarState | undefined, action: any) {
  return carReducer(state, action);
}
