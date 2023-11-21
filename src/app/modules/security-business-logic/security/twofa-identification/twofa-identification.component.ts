import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      this.securityService.ValidateCode2fa(this.idUser, code2fa).subscribe({
        next: (datas:UserValidateModel) => {
          console.log(datas);
          this.securityService.StoreUserDataValidate(datas);
          this.router.navigate([""]);
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
