import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterInPointsComponent } from 'src/app/modules/security-business-logic/security/register-in-points/register-in-points.component';
import { SecurityBusinessLogicModule } from 'src/app/modules/security-business-logic/security/security-business-logic.module';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css'],
})
export class DriverHomeComponent {


  constructor(
    private securityService: SecurityService,
    private router: Router
    ) { 

    }


  ngOnInit(): void {
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
  }
}
