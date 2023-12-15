import { Component } from '@angular/core';
import { VariableModel } from 'src/app/models/variables.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent {

  register: VariableModel = {};

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
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

}
