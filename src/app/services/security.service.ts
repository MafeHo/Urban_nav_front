import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';
import { UserValidateModel } from '../models/user.validate.model';
import { RoleModel } from '../models/role.model';
import { PointModel } from '../models/point.model';
import { DriverModel } from '../models/driver.model';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  urlBase: string = ConfigurationRoutesBackend.urlSecurity;
  constructor(private http: HttpClient) {
    this.sessionValidate();
   }


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
  StoreIdentifiedUserData(datas: UserModel): void{
    let cadena = JSON.stringify(datas);
    let datasLS = localStorage.getItem('data-user');
    if (datasLS) {
      localStorage.removeItem('data-user');
      localStorage.setItem('data-user', cadena);
    } else {
      localStorage.setItem('data-user', cadena);
    }
  }

  getUserRoleInfo(userId: string): Observable<DriverModel | ClientModel | UserModel> {
    return this.http.get<DriverModel | ClientModel | UserModel>(`${this.urlBase}user/${userId}/info`);
  }

  StoreUserRoleInfo(datas: DriverModel | ClientModel | UserModel): boolean{
    let cadena = JSON.stringify(datas);
    let datasLS = localStorage.getItem('data-role');
    if (datasLS) {
      return false;
    } else {
      localStorage.setItem('data-role', cadena);
      return true;
    }
  }

  GetRoleData(): UserModel | null {
    let datasLS = localStorage.getItem('data-role');
    if (datasLS) {
      let datas = JSON.parse(datasLS);
      return datas;
    } else {
      return null;
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
  ValidateCode2fa(idUser: string, code: string): Observable<UserValidateModel> {
    return this.http.post<UserValidateModel>(`${this.urlBase}verify-2fa-code`,{
      userId: idUser,
      twofacode: code
    });
  }

  registerClient(data: any): Observable<UserModel> { 
    return this.http.post<UserModel>(`${this.urlBase}customer-public`,data);
  }

  registerDriver(data: any): Observable<UserModel> { 
    return this.http.post<UserModel>(`${this.urlBase}driver-public`,data);
  }

  uploadClient(data: any): Observable<{file: string}> { 
    return this.http.post<{file: string}>(`${this.urlBase}upload-file-passengers`,data);
  }

  uploadLicense(data: any): Observable<{file: string}> { 
    return this.http.post<{file: string}>(`${this.urlBase}upload-file-license`,data);
  }

  uploadDriver(data: any): Observable<{file: string}> { 
    return this.http.post<{file: string}>(`${this.urlBase}upload-file-drivers`,data);
  }

  uploadCar(data: any): Observable<{file: string}> { 
    return this.http.post<{file: string}>(`${this.urlBase}upload-file-vehicles`,data);
  }

  validateHashUser(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlBase}validate-hash-user`,{
      codeHash: hash
    });
  }

  /**
   * save user data in localstorage 
   * @param datas validate user data
   * @returns 
   */
  StoreUserDataValidate(datas: UserValidateModel): boolean {
    let datasLS = localStorage.getItem('datas-session');
    if (datasLS != null) {
      return false;
    } else {
      let datasString = JSON.stringify(datas);
      localStorage.setItem('datas-session', datasString);
      this.UpdateUserBehavior(datas);
      return true;
    }
  }

  /**
   * Sign out user
   */
  RemoveUserDataValidate() {
    let userDatas = localStorage.getItem('datas-session');
    let sessionDatas = localStorage.getItem('data-user');
    let roleDatas = localStorage.getItem('data-role');
    if (userDatas && sessionDatas && roleDatas) {
      localStorage.removeItem('datas-session');
      localStorage.removeItem('data-user');
      localStorage.removeItem('data-role');
    } 
    this.UpdateUserBehavior(new UserValidateModel());
  }

  RecoveryPasswordByUser(user: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.urlBase}recovery-password`,{
      email: user
    });
  }

  /** user session administrate */

  dataUserValidate = new BehaviorSubject<UserValidateModel>(new UserValidateModel());


  GetSessionData():Observable<UserValidateModel>{
    return this.dataUserValidate.asObservable();
  }

  sessionValidate() {
    let ls = localStorage.getItem('datas-session');
    if (ls) {
      let objUser = JSON.parse(ls);
      this.UpdateUserBehavior(objUser);
    }
  }

  UpdateUserBehavior(datas: UserValidateModel) {
    return this.dataUserValidate.next(datas);
  }

  sendSocket(datas: any, url: string) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: {'Content-Type': 'application/json'},
    })

  }

  identifyAnUserByRole(roleId: string): Observable<RoleModel>{
      return this.http.get<RoleModel>(`${this.urlBase}role/${roleId}`);
  }

  getTokenFromLocalStorage():string {
    let ls = localStorage.getItem('datas-session');
    if(ls) {
      let user : UserValidateModel = JSON.parse(ls);
      return user.token!;
    }
    else {
      return "";
    }
  }

  getPoints(){ 
    return this.http.get<PointModel[]>(`${this.urlBase}point`)
  }

  
  

  

}


