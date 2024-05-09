import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';
import { GiaoVien } from '../../../models/giaovien';
import { UserForm } from 'src/app/models/userform';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit{

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

  constructor(private route: ActivatedRoute, private giaoVienService: SinhvienService,private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maGV = params.get('maGV');
        if(maGV){
          this.giaoVienService.getGiaoVien(maGV).subscribe({
            next: (response) => {
              this.giaovienDetails = response;
            }
          });
        }
      }
    })
  }
  updateGiaoVien(){
    this.giaoVienService.updateGiaoVien(this.giaovienDetails).subscribe({
      next: (response) => {
        this.userFromDetails.email = this.giaovienDetails.maGV;
        this.userFromDetails.name = this.giaovienDetails.tenGV;
        this.giaoVienService.updateName(this.userFromDetails).subscribe({
          next: (res)=>{
            this.router.navigate(['/admin-teacher']);
          }
        });
      }
    });
  } 

}
