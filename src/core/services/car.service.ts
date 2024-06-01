import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = environment.apiUrl;

  private controller = '/Car';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl + this.controller);
  }

  create(car: Car): Observable<any> {
    return this.http.post<boolean>(this.apiUrl + this.controller, car);
  }

  edit(car: Car): Observable<any> {
    return this.http.patch<boolean>(this.apiUrl + this.controller, car);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + this.controller + '/' + id.toString());
  }

  get(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + this.controller + '/' + id.toString());
  }
}