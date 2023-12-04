import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { DriverModel } from 'src/app/models/driver.model';
import { RoleModel } from 'src/app/models/role.model';
import { UserModel } from 'src/app/models/user.model';
import { UserValidateModel } from 'src/app/models/user.validate.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-twofa-identification',
  templateUrl: './twofa-identification.component.html',
  styleUrls: ['./twofa-identification.component.css']
})
export class TwofaIdentificationComponent {

  idUser: string = '';
  fGroup:FormGroup = new FormGroup({});

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder,
    private router: Router
    ) { 

    }

  ngOnInit(): void {
    let datas = this.securityService.GetIdentifiedUserDataLS();
    if (datas != null) {
      this.idUser = datas._id!;
      this.buildForm();
    } else {
      this.router.navigate(['/security/identify-user']);
    }
  }

  buildForm() {

    this.fGroup = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  ValidateCode2fa(){
    if (this.fGroup.invalid) {
      alert("you must enter the code")
    } else {
      let code2fa = this.getFormGroup["code"].value;
      console.log(this.idUser);
      
      this.securityService.ValidateCode2fa(this.idUser, code2fa).subscribe({
        next: (datas:UserValidateModel) => {
          console.log(datas);
          if (datas.token != null && datas.token != undefined && datas.token != "") {
            this.securityService.StoreUserDataValidate(datas);
            let user = localStorage.getItem("datas-session");
            if (user) {
              let userJson = JSON.parse(user); 
              this.securityService.getUserRoleInfo(userJson.user._id).subscribe({
                next: (roleDatas: DriverModel | ClientModel | UserModel) => {
                  this.securityService.StoreUserRoleInfo(roleDatas);
                },
                error: (err) => {
                  console.log(err);
                }
              })
              let roleId = this.securityService.identifyAnUserByRole(userJson.user.roleId).subscribe({
                next: (role:RoleModel) => {
                  if(role.name == "Driver"){
                    this.router.navigate(["/driver-home"]);
                  }
                  else if (role.name == "Admin"){
                    this.router.navigate(["/admin-home"]);
                  }      
                  else if (role.name == "Client"){
                    this.router.navigate(["/client-home"]);
                  }         
                  else {
                    this.router.navigate([""]);
                  }
                },
                error: (err) => {
                  console.log(err);
                }
              })
              console.log(roleId);
            }
          } else {
            alert("invalid code");
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }


}
