import { Component, OnInit } from '@angular/core';
import { SinhVien } from '../../../models/sinhvien';
import { SinhvienService } from '../../../services/sinhvien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit{

  addSinhVienRequest: SinhVien = {
    maSV: '',
    tenSV: '',
    ngaySinh: new Date(),
    gioiTinh: '',
    sdt: '',
    diaChi: '',
    namNhapH: 2021,
    maCTDT: 'CNTT_47'
  };
  constructor(private sinhVienService: SinhvienService, private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addSinhVien(){
    this.sinhVienService.addSinhVien(this.addSinhVienRequest).subscribe({
      next: (sinhvien) => {
        this.router.navigate(['/admin-student']);
      }    
    });
  }

}
