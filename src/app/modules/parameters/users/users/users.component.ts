import { Component } from '@angular/core';
import { PagerClientModel } from 'src/app/models/pagerClient.model';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { ConfigurationPagination } from 'src/config/configuration.pagination';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  registerList: UserModel[] = [];
  pag = 1;
  total = 0;
  registerPerPage = ConfigurationPagination.registersPerPage;

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.listRegisters();
  }

  listRegisters() {
    this.adminService.listUsers(this.pag).subscribe({
      next: (data) => {
        this.registerList = data.registers;
        this.total = data.totalRegisters;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  activateUser(id:string){
    this.adminService.activateUser(id).subscribe({
      next: (data) => {
        alert("Usuario activado");
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deactivateUser(id:string){
    this.adminService.deactivateUser(id).subscribe({
      next: (data) => {
        alert("Usuario desactivado");
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
