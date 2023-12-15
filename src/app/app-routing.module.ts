import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { RouteNotfoundComponent } from './public/errors/route-notfound/route-notfound.component';
import { DriverHomeComponent } from './public/driver-home/driver-home.component';
import { AdminHomeComponent } from './public/admin-home/admin-home.component';
import { ClientHomeComponent } from './public/client-home/client-home.component';
import { PointsComponent } from './modules/parameters/points/points/points.component';
import { UsersComponent } from './modules/parameters/users/users/users.component';
import { VariablesComponent } from './modules/parameters/variables/variables/variables.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { ContactusComponent } from './public/contactus/contactus.component';
import { HelpComponent } from './public/help/help.component';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"aboutus",
    component: AboutusComponent
  },
  {
    path:"contactus",
    component: ContactusComponent
  },
  {
    path:"help",
    component: HelpComponent
  },
  {
    path:"driver-home",
    component: DriverHomeComponent
  },
  {
    path:"admin-home",
    component: AdminHomeComponent,
    children: [
      { path: 'points', component: PointsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'variables', component: VariablesComponent }
    ]
  },
  {
    path:"client-home",
    component: ClientHomeComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "security",
    loadChildren: () => import("./modules/security-business-logic/security/security-business-logic.module").then(m => m.SecurityBusinessLogicModule)
  },
  {
    path: "parameters",
    loadChildren: () => import("./modules/parameters/parameters.module").then(m => m.ParametersModule)
  },
  {
    path: "reports",
    loadChildren: () => import("./modules/reports/reports.module").then(m => m.ReportsModule)
  },
  {
    path: "**",
    component: RouteNotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
