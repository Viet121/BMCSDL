import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LopHocPhan } from 'src/app/models/lophocphan';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent implements OnInit{
  public role!:string;
  public fullName!:string;
  public email!: string;
  lophocphans: LopHocPhan[] = [];
  constructor(private route: ActivatedRoute,private thoiKhoaBieuService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.thoiKhoaBieuService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.thoiKhoaBieuService.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.thoiKhoaBieuService.getEmailFromToken();
      this.email = val || emailFromToken;
    });

    this.loadLopHocPhans(this.email);
  }

  loadLopHocPhans(maGV: string){
    this.thoiKhoaBieuService.getLopHocPhansByMaGV(maGV).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }
  
  logOut(){
    this.thoiKhoaBieuService.logOut();
  }

}

