import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(private http: HttpClient) { }


  /**
   * Identify user
   * @param userName 
   * @param password 
   * @returns validated user data
   */
  UserIdentification(userName: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlBase}identify-user`,{
      email: userName,
      password: password
    });
  }

  /**
   * Srore user data
   * @param datas user data
   */
  StoreIdentifiedUserData(datas: UserModel): boolean{
    let cadena = JSON.stringify(datas);
    let datasLS = localStorage.getItem('data-user');
    if (datasLS) {
      return false;
    } else {
      localStorage.setItem('data-user', cadena);
      return true;
    }
  }

  /**
   * Get user data localstorage
   * @returns user data
   */
  GetIdentifiedUserDataLS(): UserModel | null {
    let datasLS = localStorage.getItem('data-user');
    if (datasLS) {
      let datas = JSON.parse(datasLS);
      return datas;
    } else {
      return null;
    }
  }


  /**
   * Validate code 2fa
   * @param idUser 
   * @param code 
   * @returns 
   */
  ValidateCode2fa(idUser: string, code: string): Observable<object> {
    return this.http.post<object>(`${this.urlBase}verify-2fa-code`,{
      userId: idUser,
      twofacode: code
    });
  }

}
