import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit{
  public fullName!:string;
  constructor(private route: ActivatedRoute,private homeTeacherService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    const fullName = this.inforService.getName().subscribe(val=>{
      const fullNameFromToken = this.homeTeacherService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }

  logOut(){
    this.homeTeacherService.logOut();
  }

}
