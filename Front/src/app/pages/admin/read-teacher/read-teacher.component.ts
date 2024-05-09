import { Component, OnInit } from '@angular/core';
import { GiaoVien } from '../../../models/giaovien';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';

@Component({
  selector: 'app-read-teacher',
  templateUrl: './read-teacher.component.html',
  styleUrls: ['./read-teacher.component.css']
}) 
export class ReadTeacherComponent implements OnInit{
  giaovienDetails: GiaoVien = {
    maGV: '',
    tenGV: '',
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
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

}
