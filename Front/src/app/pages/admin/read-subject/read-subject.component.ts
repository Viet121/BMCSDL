import { Component, OnInit } from '@angular/core';
import { MonHoc } from '../../../models/monhoc';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';

@Component({
  selector: 'app-read-subject',
  templateUrl: './read-subject.component.html',
  styleUrls: ['./read-subject.component.css']
})
export class ReadSubjectComponent implements OnInit{
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

}
