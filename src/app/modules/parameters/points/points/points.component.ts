import { Component } from '@angular/core';
import { PagerPointModel } from 'src/app/models/pagerPoint.model';
import { PointModel } from 'src/app/models/point.model';
import { AdminService } from 'src/app/services/admin.service';
import { ConfigurationPagination } from 'src/config/configuration.pagination';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {

  registerList: PointModel[] = [];
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
    this.adminService.listPoints(this.pag).subscribe({
      next: (data) => {
        this.registerList = data.registers;
        this.total = data.totalRegisters;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
