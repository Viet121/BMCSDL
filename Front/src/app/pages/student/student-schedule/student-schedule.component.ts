import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LopHocPhan } from 'src/app/models/lophocphan';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
export class StudentScheduleComponent implements OnInit{
  public role!:string;
  public fullName!:string;
  public email!: string;
  lophocphans: LopHocPhan[] = [];
  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.lopHocPhanService.getEmailFromToken();
      this.email = val || emailFromToken;
    });

    this.loadLopHocPhans(this.email);
  }
  loadLopHocPhans(maSV: string){
    this.lopHocPhanService.getKetQuaDetailsByStudent(maSV).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }
}
