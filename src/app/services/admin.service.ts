import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationPagination } from 'src/config/configuration.pagination';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import { Observable } from 'rxjs';
import { VariableModel } from '../models/variables.model';
import { PagerClientModel } from '../models/pagerClient.model';
import { PagerPointModel } from '../models/pagerPoint.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(private http: HttpClient) { }

  listUsers(pag:number): Observable<PagerClientModel>{
    let limit = ConfigurationPagination.registersPerPage;
    let skip = (pag - 1) * limit;
    return this.http.get<PagerClientModel>(`${this.urlBase}userPager?filter={"limit":${limit}, "skip":${skip}}`);
  }

  activateUser(id:string): Observable<any>{
    return this.http.patch<any>(`${this.urlBase}active-user/${id}`, {
      status: true
    });
  }

  deactivateUser(id:string): Observable<any>{
    return this.http.patch<any>(`${this.urlBase}active-user/${id}`, {
      status: false
    });
  }

  listPoints(pag:number): Observable<PagerPointModel>{
    let limit = ConfigurationPagination.registersPerPage;
    let skip = (pag - 1) * limit;
    return this.http.get<PagerPointModel>(`${this.urlBase}pointPager?filter={"limit":${limit}, "skip":${skip}}`);
  }

  listVariables(): Observable<VariableModel[]>{
    return this.http.get<VariableModel[]>(`${this.urlBase}variable`);
  }

  editVariables(variable: VariableModel): Observable<void>{
    return this.http.patch<void>(`${this.urlBase}variable/${variable._id}`, variable);
  }

  searchVariable(id:string): Observable<VariableModel>{
    return this.http.get<VariableModel>(`${this.urlBase}variable/${id}`);
  }
}
