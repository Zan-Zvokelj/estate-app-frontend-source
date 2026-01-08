import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiUrl = 'https://estate-24ce884b10e6.herokuapp.com/properties-sale/';

  constructor(private http: HttpClient) {}

  getSales() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
