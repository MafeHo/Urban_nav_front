import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(private http: HttpClient) {
   }
   
   // get http call to get all points
    getPoints(){
      return this.http.get(`${this.urlBase}point`);
    }
}
