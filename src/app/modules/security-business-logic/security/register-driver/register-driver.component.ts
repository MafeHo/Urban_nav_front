import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent {

  fGroup: FormGroup = new FormGroup({
  });

  photoUrl: string = "";
  photoLicenseUrl: string = "";
  photoCarUrl: string = "";

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.fGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      secondName: ['', [Validators.minLength(2)]],
      firstUserName: ['', [Validators.required, Validators.minLength(2)]],
      secondUserName: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      photoLicense: ['', ''],
      photo: ['', ''],
      carModel: ['', [Validators.required, Validators.minLength(4)]],
      carPlate: ['', [Validators.required, Validators.minLength(6)]],
      carColor: ['', [Validators.required, Validators.minLength(3)]],
      carBrand: ['', [Validators.required, Validators.minLength(3)]],
      passengerCapacity: ['', [Validators.required, Validators.minLength(1)]],
      photoCar: ['', ''],
    });
  }

  registerDriver(){
    let fields = this.getFormFields;
    let data = {
      FirstName: fields["firstName"].value,
      SecondName: fields["secondName"].value,
      FirstLastName: fields["firstUserName"].value,
      SecondLastName: fields["secondUserName"].value,
      Email: fields["email"].value,
      Phone: fields["phone"].value,
      LicensePhoto: this.photoLicenseUrl,
      Photo: this.photoUrl,
      Model: fields["carModel"].value,
      Plate: fields["carPlate"].value,
      Color: fields["carColor"].value,
      CarBrand: fields["carBrand"].value,
      PassengerCapacity: fields["carBrand"].value,
      CarPhoto: this.photoCarUrl,
    }
    console.log(data);
    this.securityService.registerDriver(data).subscribe({
      next: (res:UserModel) => {
        // mandar la alerta con socket.io
        alert("User successfully registered");
      },
      error: (err) => {
        alert("Error registering user");
      }
    })
  }
  
  uploadPhoto(event: any) {
    const file: File = event.target.files[0];
    const form = new FormData();
    form.append('file', file);
    this.securityService.uploadDriver(form).subscribe({
      next: (res) => {
        this.photoUrl = res.file;
      },
      error: (err) => {
        alert("Error");
      }
    })
  }

  uploadPhotoLicense(event: any) {
    const file: File = event.target.files[0];
    const form = new FormData();
    form.append('file', file);
    this.securityService.uploadLicense(form).subscribe({
      next: (res) => {
        this.photoLicenseUrl = res.file;
      },
      error: (err) => {
        alert("Error");
      }
    })
  }

  uploadPhotoCar(event: any) {
    const file: File = event.target.files[0];
    const form = new FormData();
    form.append('file', file);
    this.securityService.uploadCar(form).subscribe({
      next: (res) => {
        this.photoCarUrl = res.file;
      },
      error: (err) => {
        alert("Error");
      }
    })
  }

  get getFormFields(){
    return this.fGroup.controls;
  }

}
