import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PointModel } from 'src/app/models/point.model';
import { UserValidateModel } from 'src/app/models/user.validate.model';
import { ParametersService } from 'src/app/services/parameters.service';
import { SecurityService } from 'src/app/services/security.service';

declare const initRecaptcha: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  list: PointModel[] = [];

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private parametersService: ParametersService
  ) {
  }
  activeSession: boolean = false;

  ngOnInit() {
    this.loadPoints();
    this.sessionValidate();
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

  sessionValidate() {
    this.securityService.GetSessionData().subscribe({
      next: (datas: UserValidateModel) => {
        if (datas.token != "") {
          this.activeSession = true;
          this.securityService.identifyAnUserByRole(datas.user!.roleId!).subscribe({
            next: (datas:any) => {
              if (datas.name == "Driver") {
                this.router.navigate(['/driver-home']);
              } else if (datas.name == "Admin") {
                this.router.navigate(['/admin-home']);
              }
              else {
                this.router.navigate(['/client-home']);
              }
            },
            error: (err:any) => {
              console.log(err);
            }
          });
        } else {
          this.activeSession = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
