import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { TwofaIdentificationComponent } from './twofa-identification/twofa-identification.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ValidationHashUserComponent } from './validation-hash-user/validation-hash-user.component';

const routes: Routes = [
  {
    path:"user-identification",
    component: UserIdentificationComponent
  },
  {
    path: "change-password",
    component: ChangePasswordComponent
  },
  {
    path: "recovery-password",
    component: RecoveryPasswordComponent
  },
  {
    path: "sign-out",
    component: SignOutComponent
  },
  {
    path: "2fa",
    component: TwofaIdentificationComponent
  },
  {
    path: "sign-in-client",
    component: RegisterClientComponent
  },
  {
    path: "validation-hash-user/:hash",
    component: ValidationHashUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityBusinessLogicRoutingModule { }
