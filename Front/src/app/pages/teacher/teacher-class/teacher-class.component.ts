import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LopHocPhan } from 'src/app/models/lophocphan';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit{
  public role!:string;
  public fullName!:string; 
  public email!: string;
  lophocphans: LopHocPhan[] = [];
  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService,private inforService : InforService, private router: Router){}
  ngOnInit(): void {
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.lopHocPhanService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.lopHocPhanService.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.lopHocPhanService.getEmailFromToken();
      this.email = val || emailFromToken;
    });

    this.loadLopHocPhans(this.email);
  }

  loadLopHocPhans(maGV: string){
    this.lopHocPhanService.getLopHocPhansByMaGV(maGV).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }

}
