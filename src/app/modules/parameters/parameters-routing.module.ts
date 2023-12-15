import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsComponent } from './points/points/points.component';
import { VariablesComponent } from './variables/variables/variables.component';
import { CreatePointComponent } from './points/create-point/create-point.component';
import { EditVariablesComponent } from './variables/edit-variables/edit-variables.component';
import { DeletePointComponent } from './points/delete-point/delete-point.component';
import { EditPointComponent } from './points/edit-point/edit-point.component';

const routes: Routes = [
  {
    path: "create-points",
    component: CreatePointComponent
  },
  {
    path: "delete-points/:id",
    component: DeletePointComponent
  },
  {
    path: "edit-points/:id",
    component: EditPointComponent
  },
  {
    path: "edit-variables/:id",
    component: EditVariablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
