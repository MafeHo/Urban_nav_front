import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterInPointsComponent } from 'src/app/modules/security-business-logic/security/register-in-points/register-in-points.component';
import { SecurityBusinessLogicModule } from 'src/app/modules/security-business-logic/security/security-business-logic.module';
import { ClientService } from 'src/app/services/client.service';
import { DriverService } from 'src/app/services/driver.service';
import { SecurityService } from 'src/app/services/security.service';
import { SocketWebService } from 'src/app/services/socketWeb.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css'],
})
export class DriverHomeComponent {


  constructor(
    private clientService: ClientService,
    private socketWebService: SocketWebService,
    private driverService: DriverService,
    private securityService: SecurityService,
    private router: Router
    
    ) { 
    }
  
  active: boolean = false;
  activeForm: boolean = true;
  newTrip: boolean = false;
  dataTrip: any;
  isOnTrip: boolean = true;
  isAvailable: boolean = false;
  driverID: string = "";
  

  ngOnInit(): void {
    // this.driverService.updateDriverStatus(this.driverID, false).subscribe({});
    let ls = localStorage.getItem('datas-session');
      if (ls) {
        let lsJson = JSON.parse(ls);
        this.securityService.identifyAnUserByRole(lsJson.user.roleId).subscribe({
          next: (datas:any) => {
            if (datas.name != "Driver") {
              this.router.navigate(['']);
            }
            else {
              this.socketWebService.connection(lsJson.user._id);
              this.socketWebService.on("NewTrip", (newTrip:any) => {
                this.newTrip = true;
                this.dataTrip = newTrip;
                console.log(this.dataTrip);
              })
            }
          },
          error: (err:any) => {
            console.log(err);
          }
        });
      } else {
        this.router.navigate(['']);
      }
    document.getElementById('#block'),addEventListener('change', () => {
      
    })
  }

  changeActiveForm() {
    this.activeForm = false;

  }

  addPointsButton() {
    this.active = true;
  }

  putAvailable() {
    let idDriver = this.securityService.GetRoleData()?._id;
    if (idDriver) {
      if (!this.isAvailable) {
        this.isAvailable = true;
        this.driverService.updateDriverStatus(idDriver, this.isAvailable).subscribe({});
      } else {
        this.isAvailable = false;
        this.driverService.updateDriverStatus(idDriver, this.isAvailable).subscribe({});
      }
    }
  }

  setOnTrip() {
    this.isOnTrip = true;
  }

  startTrip() {
    this.driverService.startTrip("656804699189db3ecb33ab0e").subscribe({
      next: (datas: any) => {
        console.log(datas);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  endTrip() {
    this.driverService.endTrip("656804699189db3ecb33ab0e").subscribe({
      next: (datas: any) => {
        console.log(datas);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  closeForm() { 
    this.newTrip = false;
  }

  acceptTrip() {
    this.driverID = JSON.parse(localStorage.getItem('data-role')!)._id;
    console.log(this.driverID);
    console.log(this.dataTrip.userId);
    this.clientService.showInfoDriver(this.driverID, this.dataTrip.userId).subscribe({
      next: (datas: any) => {
        this.newTrip = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
