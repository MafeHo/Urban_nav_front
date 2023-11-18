import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.css']
})
export class UserIdentificationComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
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
      alert("identifying...");
    }
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }
}
