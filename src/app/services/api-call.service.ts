import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl = 'https://estate-24ce884b10e6.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getProperty(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}properties/`);
  }

  deleteProperty(id: number): Observable<Property[]> {
    return this.http.delete<Property[]>(`${this.apiUrl}properties/${id}/`);
  }

  addProperty(newProperty: Property): Observable<Property[]> {
    return this.http.post<Property[]>(`${this.apiUrl}properties/`, newProperty);
  }

  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}properties/${id}/`);
  }

  updateProperty(id: string, updateProperty: Property): Observable<Property> {
    return this.http.put<Property>(
      `${this.apiUrl}properties/${id}/`,
      updateProperty
    );
  }
}
