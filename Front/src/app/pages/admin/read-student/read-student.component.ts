import { Component, OnInit } from '@angular/core';
import { SinhVien } from '../../../models/sinhvien';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';

@Component({
  selector: 'app-read-student',
  templateUrl: './read-student.component.html',
  styleUrls: ['./read-student.component.css']
})
export class ReadStudentComponent implements OnInit{
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
  
}
