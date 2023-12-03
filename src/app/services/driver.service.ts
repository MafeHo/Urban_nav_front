import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import { Observable } from 'rxjs';
import { namePointModel } from '../models/namePoint.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(
    private http: HttpClient,
  ) { }

  getPointsId(points: namePointModel[]): Observable<String[]>{
    console.log(points);
    return this.http.post<String[]>(`${this.urlBase}point-names`,
      points
    );
  }

  registerDriversInDB(driver_id: string, points: string[]): Observable<void>{
    return this.http.post<void>(`${this.urlBase}severalPoints/${driver_id}`, 
      points
    );
  }


}
