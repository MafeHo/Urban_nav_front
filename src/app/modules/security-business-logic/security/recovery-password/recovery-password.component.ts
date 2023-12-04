import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService
  ) { 

  }

  ngOnInit() {
    this.fGroup = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
    });
  }

  RecoveryPassword() {
    if (this.fGroup.invalid) {
      alert('You must enter your data correctly');
    } else {
      let user = this.getFormGroup["user"].value;
      this.securityService.RecoveryPasswordByUser(user).subscribe({
        next: (data:UserModel) => {
          alert('The password has been sent by text message to phone number: ' + data.phone);
        },
        error: (err) => {
          alert('It has ocurred an error while sending your new password');
        }
      });
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  } 

}
