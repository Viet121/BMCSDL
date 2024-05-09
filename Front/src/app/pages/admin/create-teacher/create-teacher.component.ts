import { Component, OnInit } from '@angular/core';
import { GiaoVien } from '../../../models/giaovien';
import { SinhvienService } from '../../../services/sinhvien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit{

  addGiaoVienRequest: GiaoVien = {
    maGV: '',
    tenGV: '',
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
  };
  constructor(private giaoVienService: SinhvienService, private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addGiaoVien(){
    this.giaoVienService.addGiaoVien(this.addGiaoVienRequest).subscribe({
      next: (giaovien) => {
        this.router.navigate(['/admin-teacher']);
      }    
    });
  }

}
