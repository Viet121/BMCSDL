import { Component, OnInit } from '@angular/core';
import { SinhvienService } from '../../../services/sinhvien.service';
import { Router } from '@angular/router';
import { MonHoc } from '../../../models/monhoc';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit{

  addMonHocRequest: MonHoc = {
    maMH: '',
    tenMH: '',
    soTinChiMH: 0,
    maCTDT: 'CNTT_47',
  };
  constructor(private monHocService: SinhvienService, private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  maMHExists: boolean = false;
  addMonHoc() {
    if (!this.addMonHocRequest.maMH) {
      // Xử lý trường hợp khi mã môn học là undefined hoặc null
      console.error("Mã môn học không hợp lệ!");
      return;
    }
    this.monHocService.checkMaMHExists(this.addMonHocRequest.maMH).subscribe({
      next: (exists) => {
        this.maMHExists = exists;
        if (exists) {
          // Mã môn học đã tồn tại, xử lý thông báo hoặc hiển thị lỗi
          console.log("Mã môn học đã tồn tại!");
        } else {
          // Mã môn học chưa tồn tại, tiến hành thêm
          this.monHocService.addMonHoc(this.addMonHocRequest).subscribe({
            next: (monhoc) => {
              this.router.navigate(['/admin-subject']);
            },
          });
        }
      },
    });
  }


}
