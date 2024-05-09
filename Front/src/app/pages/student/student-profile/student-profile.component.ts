import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhVien } from 'src/app/models/sinhvien';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{
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
  public email!:string;
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
    })
  }


}
