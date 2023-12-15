import { Component } from '@angular/core';
import { PointModel } from 'src/app/models/point.model';
import { ParametersService } from 'src/app/services/parameters.service';
import { SecurityService } from 'src/app/services/security.service';
import * as M from 'materialize-css';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { TripModel } from 'src/app/models/trip.model';
import { SocketWebService } from 'src/app/services/socketWeb.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  fGroup: FormGroup = new FormGroup({}); 

  list: PointModel[] = [];
  instance: M.FormSelect | undefined;
  userId = JSON.parse(localStorage.getItem('datas-session')!).user._id;
  infoDriver: string = '';
  infoDriver2: any;
  infoDriverBoolean: boolean = false;
  buttonPanic: boolean = false;
  buttonPanic23: boolean = true;
  btnPanic: boolean = false;
  panic: boolean = false;

  constructor(
    private socketWebService: SocketWebService,
    private securityService: SecurityService,
    private parametersService: ParametersService,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {

  }
  activeSession: boolean = false;
  ongoingPetition: boolean = false;
  dataId: string = '';

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
    this.socketWebService.connection(this.userId);
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
    this.infoPetition.clientId = JSON.parse(localStorage.getItem('data-role')!)._id;
    console.log(this.infoPetition)
    this.clientService.searchDrivers(this.infoPetition.originPointId!, this.infoPetition.destinyPointId!, this.infoPetition.total!, this.infoPetition.clientId!).subscribe({ 
      next: (data:any) => {
        this.socketWebService.on("Accept", (message:any) => {
          this.infoDriver = message.message;
          this.infoDriver2 = message;
          this.infoDriverBoolean = true;
        })
      },
      error: (err: any) => {
        console.log(err);
      }
     });
  }


  declinePrice(){
    this.ongoingPetition = false;
  }

  acceptTrip(){
    this.clientService.createTrip(this.infoPetition.total!, this.infoDriver2.driverId!, this.infoPetition.clientId!, this.infoPetition.originPointId!, this.infoPetition.destinyPointId!).subscribe({
      next: (data:any) => {
        console.log(data);
        this.dataId = data._id;
        this.infoDriverBoolean = false;
        this.auxiliar();
        this.socketWebService.on("Accepttt", (message:any) => {
          this.buttonPanic = true;
          this.infoDriver = message.message;
        })
      },
      error: (err: any) => { 
        console.log(err);
      }
    });
    
  }

  buttonPanicFunction(){
    this.buttonPanic = false;
    this.buttonPanic23 = false;
    document.querySelector('#form')?.classList.add('hide');
    this.btnPanic = true;
  }

  help(){
    this.clientService.panicButton(this.dataId).subscribe({
      next: (data:any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  auxiliar(){
    this.clientService.startTrip(this.infoDriver2.driverId!, this.dataId).subscribe({
      next: (datas: any) => {
        console.log(datas);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  closeForm(){
    this.infoDriverBoolean = false;
  }
 
}
