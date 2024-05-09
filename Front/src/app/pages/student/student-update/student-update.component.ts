import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhVien } from 'src/app/models/sinhvien';
import { UserForm } from 'src/app/models/userform';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit{
  public email!:string;
  sinhvienDetails: SinhVien = {
    maSV: '',
    tenSV: '',
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
    namNhapH: 2021, 
    maCTDT: 'CNTT_47'
  };
  userFromDetails: UserForm = {
    id:0,
    email: '',
    name: '',
    password: '',
    user_type: '',
  };

  constructor(private route: ActivatedRoute, private sinhVienService: SinhvienService,private router: Router, private inforService : InforService){}
  
  ngOnInit() : void{
    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.sinhVienService.getEmailFromToken();
      this.email = val || emailFromToken;
    })
    this.sinhVienService.getSinhVien(this.email).subscribe({
      next: (response) => {
        this.sinhvienDetails = response;
      }
    });
  } 

  updateSinhVien(){
    this.sinhVienService.updateSinhVien(this.sinhvienDetails).subscribe({
      next: (response) => {
        this.userFromDetails.email = this.sinhvienDetails.maSV;
        this.userFromDetails.name = this.sinhvienDetails.tenSV;
        this.sinhVienService.updateName(this.userFromDetails).subscribe({
          next: (res) => {
            this.router.navigate(['/student-profile']);
          }
        });
      }
    });
  }
  

}
