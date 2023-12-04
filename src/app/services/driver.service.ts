import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import { Observable } from 'rxjs';
import { namePointModel } from '../models/namePoint.model';
import { DriverModel } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(
    private http: HttpClient,
  ) { }

  getPointsId(points: namePointModel[]): Observable<String[]>{
    return this.http.post<String[]>(`${this.urlBase}point-names`,
      points
    );
  }

  registerDriversInDB(driver_id: string, points: string[]): Observable<void>{
    return this.http.post<void>(`${this.urlBase}severalPoints/${driver_id}`, 
      points
    );
  }

  updateDriverStatus(idDriver: string, putAvailable: boolean): Observable<DriverModel> {
    return this.http.patch<DriverModel>(`${this.urlBase}driver/${idDriver}`,{
      isAvailable: putAvailable
    });
  }

  startTrip(idTrip: string): Observable<void> {
    return this.http.patch<void>(`${this.urlBase}trip/${idTrip}/start`, {}, {})
  }

  endTrip(idTrip: string) {
    return this.http.patch(`${this.urlBase}trip/${idTrip}/end`, {}, {});
  }


}
