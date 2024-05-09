import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public role!:string;
  public email!:string;
  public fullName!:string;
  constructor( private adHomeService : SinhvienService,private router: Router, private inforService : InforService){}
  ngOnInit(): void {
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.adHomeService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.adHomeService.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.adHomeService.getEmailFromToken();
      this.email = val || emailFromToken;
    })
  }
  profile(){
    if (this.role === 'admin') {
      this.router.navigate(['/admin-profile'])
    } else if (this.role === 'teacher') {
      this.router.navigate(['/teacher-profile'])
    } else {
      this.router.navigate(['/student-profile'])
    }
  }

  logOut(){
    this.adHomeService.logOut();
  }
}
