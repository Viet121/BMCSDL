import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiaoVien } from 'src/app/models/giaovien';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit{
  giaovienDetails: GiaoVien = {
    maGV: '',
    tenGV: '',
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
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
    })
  }

}
