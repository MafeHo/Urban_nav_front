import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
    ) { 

    }

  ngOnInit(): void {
    let datas = this.securityService.GetIdentifiedUserDataLS();
    if (datas != null) {
      this.idUser = datas._id!;
      this.buildForm();
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
        next: (datas:object) => {
          console.log(datas);
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
