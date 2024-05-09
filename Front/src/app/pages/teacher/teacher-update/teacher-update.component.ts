import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiaoVien } from 'src/app/models/giaovien';
import { UserForm } from 'src/app/models/userform';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit{

  giaovienDetails: GiaoVien = {
    maGV: '',
    tenGV: '', 
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
  };
  userFromDetails: UserForm = {
    id:0,
    email: '',
    name: '',
    password: '',
    user_type: '',
  };
  public email!:string;

  constructor(private route: ActivatedRoute, private giaoVienService: SinhvienService,private router: Router, private inforService : InforService){}

  ngOnInit(): void {
    this.inforService.getEmail()
    .subscribe(val=>{
      const emailFromToken = this.giaoVienService.getEmailFromToken();
      this.email = val || emailFromToken;
    })
    this.giaoVienService.getGiaoVien(this.email).subscribe({
      next: (response) => {
        this.giaovienDetails = response;
      }
    });
  }
  updateGiaoVien(){
    this.giaoVienService.updateGiaoVien(this.giaovienDetails).subscribe({
      next: (response) => {
        this.userFromDetails.email = this.giaovienDetails.maGV;
        this.userFromDetails.name = this.giaovienDetails.tenGV;
        this.giaoVienService.updateName(this.userFromDetails).subscribe({
          next: (res)=>{
            this.router.navigate(['/teacher-profile']);
          }
        }); 
      }
    });
  } 

}
