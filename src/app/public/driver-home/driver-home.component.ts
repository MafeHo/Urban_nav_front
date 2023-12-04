import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterInPointsComponent } from 'src/app/modules/security-business-logic/security/register-in-points/register-in-points.component';
import { SecurityBusinessLogicModule } from 'src/app/modules/security-business-logic/security/security-business-logic.module';
import { DriverService } from 'src/app/services/driver.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css'],
})
export class DriverHomeComponent {


  constructor(
    private driverService: DriverService,
    private securityService: SecurityService,
    private router: Router
    
    ) { 

    }
  
  active: boolean = false;
  activeForm: boolean = true;
  isOnTrip: boolean = false;
  isAvailable: boolean = false;
  driverID: string = this.securityService.GetRoleData()?._id!;
  

  ngOnInit(): void {
    this.driverService.updateDriverStatus(this.driverID, false).subscribe({});
    let ls = localStorage.getItem('datas-session');
      if (ls) {
        let lsJson = JSON.parse(ls);
        this.securityService.identifyAnUserByRole(lsJson.user.roleId).subscribe({
          next: (datas:any) => {
            if (datas.name != "Driver") {
              this.router.navigate(['']);
            }
          },
          error: (err:any) => {
            console.log(err);
          }
        });
      } else {
        this.router.navigate(['']);
      }
    console.log(document.getElementById('#block'))
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


}
