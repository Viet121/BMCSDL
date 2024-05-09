import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit{
  public fullName!:string;
  constructor(private route: ActivatedRoute,private homeStudentService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    const fullName = this.inforService.getName().subscribe(val=>{
      const fullNameFromToken = this.homeStudentService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }

  logOut(){
    this.homeStudentService.logOut();
  }


}
