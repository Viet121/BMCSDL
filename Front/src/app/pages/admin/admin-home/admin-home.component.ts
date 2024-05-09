import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  public fullName!:string;
  
  constructor(private route: ActivatedRoute,private homeAdminService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    const fullName = this.inforService.getName().subscribe(val=>{
      const fullNameFromToken = this.homeAdminService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }

  logOut(){
    this.homeAdminService.logOut();
  }

}
