import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor( private notFoundService : SinhvienService,private router: Router){}
  logOut(){
    this.notFoundService.logOut();
  }
}
