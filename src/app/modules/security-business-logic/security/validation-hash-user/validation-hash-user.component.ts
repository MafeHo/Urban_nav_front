import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-validation-hash-user',
  templateUrl: './validation-hash-user.component.html',
  styleUrls: ['./validation-hash-user.component.css']
})
export class ValidationHashUserComponent {
  validated = false;
  hash: string = "";
  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.hash = this.route.snapshot.params["hash"];
    this.validateHash();
  }

  validateHash(){
    this.securityService.validateHashUser(this.hash).subscribe({
      next: (res:boolean) => {
        this.validated = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
