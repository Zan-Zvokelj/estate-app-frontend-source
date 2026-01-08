import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private apiUrl = 'https://estate-24ce884b10e6.herokuapp.com/properties-parking/';

  constructor(private http: HttpClient) {}

  getParking() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
