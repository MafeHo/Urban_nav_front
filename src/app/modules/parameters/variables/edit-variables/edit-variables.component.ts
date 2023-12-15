import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableModel } from 'src/app/models/variables.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-variables',
  templateUrl: './edit-variables.component.html',
  styleUrls: ['./edit-variables.component.css']
})
export class EditVariablesComponent {

  register: VariableModel = {};
  fGroup: FormGroup = new FormGroup({});
  recordId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { 
    this.recordId = this.route.snapshot.params["id"];
  }

  ngOnInit(){
    this.BuildForm();
    this.searchVariable();
    this.adminService.listVariables().subscribe({
      next: (data) => {
        this.register = data[0];
        console.log(this.register);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sender_email: ['', [Validators.required, Validators.email]],
      priceKm: ['', [Validators.required]],
    });
  }

  get getFormGroup() {
    return this.fGroup.controls;
  }

  searchVariable() {
    this.adminService.searchVariable(this.recordId).subscribe({
      next: (data: VariableModel) => {
        this.getFormGroup["id"].setValue(data._id);
        this.getFormGroup["email"].setValue(data.email);
        this.getFormGroup["sender_email"].setValue(data.sender_email);
        this.getFormGroup["priceKm"].setValue(data.priceKm);
        console.log(this.register);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  editVariables() {
    if (this.fGroup.invalid) {
      alert("incomplete data");
    }else {
      let model = this.obtainVariable();
      this.adminService.editVariables(model).subscribe({
        next: (data) => {
          console.log(data);
          alert("variables edited");
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  obtainVariable(): VariableModel {
    let model = new VariableModel();
    model._id = this.getFormGroup["id"].value;
    model.email = this.getFormGroup["email"].value;
    model.sender_email = this.getFormGroup["sender_email"].value;
    model.priceKm = parseInt(this.getFormGroup["priceKm"].value);
    return model;
  }
}
