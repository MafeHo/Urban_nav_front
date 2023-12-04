import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import {TripPetitionModel } from '../models/tripPetition.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlBase: string = ConfigurationRoutesBackend.urlSecurity;

  constructor(
    private http: HttpClient
  ) { }

  getCost(origin:string, destiny: string): Observable<TripPetitionModel> {
    return this.http.post<TripPetitionModel>(`${this.urlBase}build-graph`,{
      originPointId: origin,
      destinyPointId: destiny
    });
  }

  


}
