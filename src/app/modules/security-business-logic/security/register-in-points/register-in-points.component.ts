import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Component,  Output, EventEmitter, Input} from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/models/role.model';
import { PointModel } from 'src/app/models/point.model';

import * as M from 'materialize-css';
import { take } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';



@Component({
  selector: 'app-register-in-points',
  templateUrl: './register-in-points.component.html',
  styleUrls: ['./register-in-points.component.css'],
})
export class RegisterInPointsComponent {
  options: string[] = []
  fGroup: FormGroup = new FormGroup({});
  instance: M.FormSelect | undefined;
  activeForm: boolean = true;

  @Output() newItemEvent = new EventEmitter<boolean>();
  
    addNewItem() {
      this.newItemEvent.emit(this.activeForm);
    }

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private driverService: DriverService,
    private router: Router
  ) { 

  }

  ngOnInit(){
    this.BuildForm();
    this.fullFormulary();
    setTimeout(() => {
      this.instance = M.FormSelect.init(document.querySelector('#pointsSelect') as Element, {});
    }, 1000);
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      point: ['', [Validators.required]]
    });
    let controls = this.getFormGroup
    controls['point'].valueChanges.subscribe((value) => {
      if(value.length > 0) {
        document.querySelector('#parangutirimicuaro')?.classList.remove('disabled');
      }
      else {
        document.querySelector('#parangutirimicuaro')?.classList.add('disabled');
      }
    })
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }

  fullFormulary(){
    this.securityService.getPoints()
      .pipe(take(1))
      .subscribe((points:PointModel[]) => {
        points.forEach((point) => this.options.push(point.name!));
      })
  } 
  
  registerDrivers() {
      let point = this.fGroup.controls['point'].value;
      let driverLs = localStorage.getItem('data-role');
      if (driverLs) {
        let driverJson = JSON.parse(driverLs);

        this.driverService.getPointsId(point).pipe(take(1)).subscribe({
          next: (datas:any) => {
            this.driverService.registerDriversInDB(driverJson._id, datas).pipe(take(1)).subscribe({
              next: (datas:any) => {
                this.activeForm = false;
                this.addNewItem();
              },
              error: (err:any) => {
                alert("Couldn't register you in the points")
              }
            })
          },
          error: (err:any) => {
            console.log(err);
          }
        });
      }
    
  }
}
