import { Component, Input, OnInit } from '@angular/core';
import { SinhVien } from '../../../models/sinhvien';
import { SinhvienService } from '../../../services/sinhvien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForm } from 'src/app/models/userform';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  
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

  constructor(private route: ActivatedRoute, private sinhVienService: SinhvienService,private router: Router){}
  ngOnInit() : void{
    this.route.paramMap.subscribe({
      next: (params) => {
        const maSV = params.get('maSV');
        if(maSV){
          this.sinhVienService.getSinhVien(maSV).subscribe({
            next: (response) => {
              this.sinhvienDetails = response;
            }
          });
        }
      }
    })
  }

  updateSinhVien(){
    this.sinhVienService.updateSinhVien(this.sinhvienDetails).subscribe({
      next: (response) => {
        this.userFromDetails.email = this.sinhvienDetails.maSV;
        this.userFromDetails.name = this.sinhvienDetails.tenSV;
        this.sinhVienService.updateName(this.userFromDetails).subscribe({
          next: (res) => {
            this.router.navigate(['/admin-student']);
          }
        });
      }
    });
  }
  

}
