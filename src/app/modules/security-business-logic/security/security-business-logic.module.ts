import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityBusinessLogicRoutingModule } from './security-business-logic-routing.module';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { TwofaIdentificationComponent } from './twofa-identification/twofa-identification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ValidationHashUserComponent } from './validation-hash-user/validation-hash-user.component';
import { RegisterInPointsComponent } from './register-in-points/register-in-points.component';

@NgModule({
  declarations: [
    UserIdentificationComponent,
    TwofaIdentificationComponent,
    ChangePasswordComponent,
    RecoveryPasswordComponent,
    CreateUserComponent,
    EditUserComponent,
    ListUserComponent,
    DeleteUserComponent,
    SignOutComponent,
    RegisterClientComponent,
    ValidationHashUserComponent,
    RegisterInPointsComponent
  ],
  imports: [
    CommonModule,
    SecurityBusinessLogicRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  exports:[
    RegisterInPointsComponent
  ]
})
export class SecurityBusinessLogicModule { }
