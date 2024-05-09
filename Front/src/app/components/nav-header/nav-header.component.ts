import { Component, OnInit } from '@angular/core';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
})
export class NavHeaderComponent implements OnInit{
  public role!:string;
  constructor( private navHeaderService : SinhvienService, private inforService : InforService){}

  ngOnInit(): void {
    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.navHeaderService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

}