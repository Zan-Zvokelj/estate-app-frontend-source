import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://estate-24ce884b10e6.herokuapp.com/properties-home/';

  constructor(private http: HttpClient) {}

  getHomes() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
