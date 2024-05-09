import { Component, OnInit } from '@angular/core';
import { MonHoc } from '../../../models/monhoc';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit{
  monhocDetails: MonHoc = {
    maMH: '',
    tenMH: '',
    soTinChiMH: 0,
    maCTDT: 'CNTT_47'
  };
  constructor(private route: ActivatedRoute, private monHocService: SinhvienService,private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maMH = params.get('maMH');
        if(maMH){
          this.monHocService.getMonHoc(maMH).subscribe({
            next: (response) => {
              this.monhocDetails = response;
            }
          });
        }
      }
    })
  }
  updateMonHoc(){
    this.monHocService.updateMonHoc(this.monhocDetails).subscribe({
      next: (response) => {
        this.router.navigate(['/admin-subject']);
      }
    });
  }

}
