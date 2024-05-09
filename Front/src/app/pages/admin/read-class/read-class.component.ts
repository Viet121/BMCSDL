import { Component, OnInit } from '@angular/core';
import { LopHocPhan } from '../../../models/lophocphan';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';

@Component({
  selector: 'app-read-class',
  templateUrl: './read-class.component.html',
  styleUrls: ['./read-class.component.css']
})
export class ReadClassComponent implements OnInit{
  lophocphanDetails: LopHocPhan = {
    maLHP: '',
    maMH: '',
    maGV: '',
    thu: '',
    gio: '',
    soLuongSV: 0,
    tenMH: '',
    tenGV: '',
    isEditing: undefined
  };
  lophocphans: LopHocPhan[] = [];
  lophocphansvs: LopHocPhan[] = [];
  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService, private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maLHP = params.get('maLHP');
        if(maLHP){
          this.loadLopHocPhanGiaoVien(maLHP);
          this.loadLopHocPhanSinhVien(maLHP);
        }
      }
    })
  }

  loadLopHocPhanGiaoVien(maLHP: string){
    this.lopHocPhanService.getLopHocPhanGiaoVien(maLHP).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }

  loadLopHocPhanSinhVien(maLHP: string){
    this.lopHocPhanService.getLopHocPhanSinhVien(maLHP).subscribe((result: LopHocPhan[]) => (this.lophocphansvs = result));
  }
  

}
