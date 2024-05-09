import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LopHocPhan } from 'src/app/models/lophocphan';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';
import { AddCmtComponent } from '../add-cmt/add-cmt.component';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit{
  public role!:string;
  public fullName!:string;
  public email!: string;
  lophocphans: LopHocPhan[] = [];

  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService,private inforService : InforService, private router: Router,private dialog: MatDialog){}
  
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

  openAddCmtForm(maLHP: string){
    const dialogRef = this.dialog.open(AddCmtComponent, {
      data: { maLHP: maLHP },
    });
  }
}
