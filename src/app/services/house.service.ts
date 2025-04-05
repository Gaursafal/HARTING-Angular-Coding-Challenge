import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiUrl = 'https://www.anapioficeandfire.com/api/houses';

  constructor(private http: HttpClient) {}

  getAllHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=1&pageSize=50`);
  }

  getHouseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
