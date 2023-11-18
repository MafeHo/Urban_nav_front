import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListDriverComponent } from './driver/list-driver/list-driver.component';
import { CreateDriverComponent } from './driver/create-driver/create-driver.component';
import { EditDriverComponent } from './driver/edit-driver/edit-driver.component';
import { DeleteDriverComponent } from './driver/delete-driver/delete-driver.component';
import { DeleteAdminComponent } from './admin/delete-admin/delete-admin.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { DeleteTripComponent } from './trip/delete-trip/delete-trip.component';
import { CreateTripComponent } from './trip/create-trip/create-trip.component';
import { ListTripComponent } from './trip/list-trip/list-trip.component';
import { EditTripComponent } from './trip/edit-trip/edit-trip.component';


@NgModule({
  declarations: [
    DeleteClientComponent,
    CreateClientComponent,
    EditClientComponent,
    ListClientComponent,
    ListDriverComponent,
    CreateDriverComponent,
    EditDriverComponent,
    DeleteDriverComponent,
    DeleteAdminComponent,
    CreateAdminComponent,
    ListAdminComponent,
    EditAdminComponent,
    DeleteTripComponent,
    CreateTripComponent,
    ListTripComponent,
    EditTripComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
