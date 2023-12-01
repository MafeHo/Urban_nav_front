import { Component } from '@angular/core';
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
