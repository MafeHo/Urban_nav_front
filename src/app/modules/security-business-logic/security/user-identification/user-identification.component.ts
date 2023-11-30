import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.css']
})
export class UserIdentificationComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) { 

  }

  ngOnInit(){
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
    });
  }

  IdentifyUser() {
    if (this.fGroup.invalid) {
      alert("incomplete data");
    }else {
      let userName = this.fGroup.controls['userName'].value;
      let password = MD5(this.fGroup.controls['password'].value).toString();
      this.securityService.UserIdentification(userName, password).subscribe({
        next: (datas:any) => {
          if(datas._id == null || datas._id == undefined){
            alert("incorrect credentials or missing email validation");
          } else {
          console.log(datas);
          if (this.securityService.StoreIdentifiedUserData(datas)) {
            this.router.navigate(['/security/2fa']);
          }
          this.router.navigate(['/security/2fa']);
        }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  get getFormGroup() {
    //console.log(this.fGroup.controls['userName'])
    return this.fGroup.controls;
  }
}
