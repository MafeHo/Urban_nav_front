import { Component } from '@angular/core';
import { PointModel } from 'src/app/models/point.model';
import { ParametersService } from 'src/app/services/parameters.service';
import { SecurityService } from 'src/app/services/security.service';
import * as M from 'materialize-css';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { TripModel } from 'src/app/models/trip.model';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  fGroup: FormGroup = new FormGroup({}); 

  list: PointModel[] = [];
  instance: M.FormSelect | undefined;

  constructor(
    private securityService: SecurityService,
    private parametersService: ParametersService,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {

  }
  activeSession: boolean = false;
  ongoingPetition: boolean = false;

  infoPetition: TripModel = {
    total: 0,
    driverId: '',
    clientId: '',
    originPointId: '',
    destinyPointId: ''
  };

  ngOnInit() {
    this.BuildForm();
    this.loadPoints();
    setTimeout(() => {
      this.instance = M.FormSelect.init(document.querySelector('#pointsSelect') as Element, {});
    }, 1000);
  }

  // load all points from parameters service
  loadPoints() {
    this.parametersService.getPoints().subscribe({
      next: (data:any) => {
        this.list = data;
        console.log(this.list)
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    }); 
  }

  requestMyTrip(){
    let origin = this.fGroup.controls['origin'].value;
    let destination = this.fGroup.controls['destination'].value;
    console.log(origin, destination);

    if (origin && destination) {
      this.clientService.getCost(origin, destination).subscribe({
        next: (data:any) => {
          this.infoPetition.total = data.cost;
          this.infoPetition.originPointId = origin;
          this.infoPetition.destinyPointId = destination;
          console.log(this.infoPetition);
          
          this.ongoingPetition = true;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
      
    }
  }

  acceptPrice(){
    this.ongoingPetition = false;
  }

  declinePrice(){
    this.ongoingPetition = false;
  }
 
}
