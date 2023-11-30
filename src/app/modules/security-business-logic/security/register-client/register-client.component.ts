import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { ConfigurationRoutesBackend } from 'src/config/configuration.routes.backend';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {

fGroup: FormGroup = new FormGroup({ 
});

constructor(
  private fb: FormBuilder, 
  private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.fGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      secondName: ['', [Validators.minLength(2)]],
      firstUserName: ['', [Validators.required, Validators.minLength(2)]],
      secondUserName: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      emergencyContact: ['', [Validators.required, Validators.minLength(12)]],
      photo: ['', '']
    });
  }

  registerClient(){
    let fields = this.getFormFields;
    let data = {
      FirstName: fields["firstName"].value,
      SecondName: fields["secondName"].value,
      FirstLastname: fields["firstUserName"].value,
      SecondLastname: fields["secondUserName"].value,
      Email: fields["email"].value,
      Phone: fields["phone"].value,
      EmergencyContact: fields["emergencyContact"].value,
      Photo: fields["photo"].value,
    }
    this.securityService.registerClient(data).subscribe({
      next: (res:UserModel) => {
        // mandar la alerta con socket.io
        // this.securityService.sendSocket({
        //   recipient: trip.clientId,
        //   message: "No se encontraron conductores en el punto de origen"
        // }, ConfigurationRoutesBackend.urlAccept)
        alert("User successfully registered");
      },
      error: (err) => {
        alert("Error registering user");
      }
    })
  }

  get getFormFields(){
    return this.fGroup.controls;
  }
}
