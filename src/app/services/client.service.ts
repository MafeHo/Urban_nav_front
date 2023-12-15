import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import {TripPetitionModel } from '../models/tripPetition.model';
import { driverInPointsModel } from '../models/driverInPoints.model';
import { TripModel } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  urlBase2: string = ConfigurationRoutesBackend.urlRegister;

  constructor(
    private http: HttpClient
  ) { }

  getCost(origin:string, destiny: string): Observable<TripPetitionModel> {
    return this.http.post<TripPetitionModel>(`${this.urlBase}build-graph`,{
      originPointId: origin,
      destinyPointId: destiny
    });
  }

  searchDrivers(origin: String, destiny: String, price: Number, client: String): Observable<driverInPointsModel> {
    return this.http.post<driverInPointsModel>(`${this.urlBase2}trip/searchdrivers`, {
      total: price,
      clientId: client,
      originPointId: origin,
      destinyPointId: destiny
    });
  }

  showInfoDriver(idDriver: string, idClient: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase2}trip/showInfoDriver/${idDriver}/${idClient}`)
  }

  createTrip(total: number, driverId: string, clientId: string, originPointId: string, destinyPointId: string): Observable<TripModel> {
    return this.http.post<TripModel>(`${this.urlBase2}trip`, {
      total: total,
      driverId: driverId,
      clientId: clientId,
      originPointId: originPointId,
      destinyPointId: destinyPointId,
      status: "ASSIGNED"
    })
  }

}
