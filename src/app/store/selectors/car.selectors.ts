import { createFeatureSelector, createSelector } from '@ngrx/store';
import { carAdapter, CarState } from '../reducers/car.reducer';

export const selectCarState = createFeatureSelector<CarState>('cars');

export const { selectAll: selectAllCars } = carAdapter.getSelectors(selectCarState);

export const selectCarById = (id: string) => createSelector(selectCarState, (state) => state.entities[id]);