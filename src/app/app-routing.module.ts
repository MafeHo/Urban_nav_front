import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { RouteNotfoundComponent } from './public/errors/route-notfound/route-notfound.component';
import { DriverHomeComponent } from './public/driver-home/driver-home.component';
import { AdminHomeComponent } from './public/admin-home/admin-home.component';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"driver-home",
    component: DriverHomeComponent
  },
  {
    path:"admin-home",
    component: AdminHomeComponent
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
