import { Component, OnInit } from '@angular/core';
import { SinhvienService } from '../../../services/sinhvien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LopHocPhan } from '../../../models/lophocphan';
import { MonHoc } from '../../../models/monhoc';
import { GiaoVien } from '../../../models/giaovien';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit{
  editLopHocPhanRequest: LopHocPhan = {
    maLHP: '',
    maMH: '',
    maGV: '',
    thu: '',
    gio: '',
    soLuong: 0,
    isEditing: undefined
  };
  lophocphans: LopHocPhan[] = [];

  constructor(private route: ActivatedRoute, private lopHocPhanService: SinhvienService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maLHP = params.get('maLHP');
        if(maLHP){
          this.loadLopHocPhanGiaoVien(maLHP);
          this.loadGiaoViens();
          this.loadMonHocs();
        }
      }
    })
  }
  monhocs: MonHoc[] = [];
  loadMonHocs(){
    this.lopHocPhanService.getMonHocs().subscribe((result: MonHoc[]) => (this.monhocs = result));
  }
  giaoviens: GiaoVien[] = [];
  loadGiaoViens(){
    this.lopHocPhanService.getGiaoViens().subscribe((result: GiaoVien[]) => (this.giaoviens = result));
  }
  checkTimeGVExists(maGV: string, thu: string, gio: string): Observable<boolean> {
    return this.lopHocPhanService.checkTimeGVExists(maGV, thu, gio);
  }
  errorMessage: string = '';
  updateLopHocPhan(){
    this.checkTimeGVExists(this.editLopHocPhanRequest.maGV, this.editLopHocPhanRequest.thu, this.editLopHocPhanRequest.gio)
      .subscribe({
        next: (isTimeConflict) => {
          if (isTimeConflict) {
            this.errorMessage = "Giáo viên đã trùng giờ dạy!";
          } else {
            this.lopHocPhanService.updateLopHocPhan(this.editLopHocPhanRequest).subscribe({
              next: (response) => {
                this.router.navigate(['/admin-class']);
              }
            });
          }
        },
      }); 
  }

  loadLopHocPhanGiaoVien(maLHP: string) {
    this.lopHocPhanService.getLopHocPhanGiaoVien(maLHP).subscribe((result: LopHocPhan[]) => {
      if (result.length > 0) {
        this.editLopHocPhanRequest = { ...result[0] };
      }
    });
  }
  

}
