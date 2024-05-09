import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { KetQua } from 'src/app/models/ketqua';
import { LopHocPhan } from 'src/app/models/lophocphan';
import { ThongKe } from 'src/app/models/thongke';
import { SinhvienService } from 'src/app/services/sinhvien.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-read-classgv',
  templateUrl: './read-classgv.component.html',
  styleUrls: ['./read-classgv.component.css']
})
export class ReadClassgvComponent implements OnInit{
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
  diemDetails: KetQua = {
    maLHP: '',
    maSV: '',
    diem: 0,
  }
  currentPage: number=1;
  public nameFile!:string;
  public fileName!:string;
  lophocphans: LopHocPhan[] = [];
  lophocphansvs: LopHocPhan[] = [];
  public y: number = 0;
  public tb: number = 0;
  public k: number = 0;
  public g: number = 0;
  public xs: number = 0;
  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService, private router: Router){}


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maLHP = params.get('maLHP');
        if(maLHP){
          this.nameFile = maLHP;
          this.fileName = this.nameFile+'.xlsx';
          this.loadLopHocPhanGiaoVien(maLHP);
          this.loadLopHocPhanSinhVien(maLHP);
        }
      }
    })
  }

  /*loadLopHocPhanGiaoVien(maLHP: string){
    this.lopHocPhanService.getLopHocPhanGiaoVien(maLHP).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }*/
  loadLopHocPhanGiaoVien(maLHP: string){
    this.lopHocPhanService.getLopHocPhanGiaoVien2(maLHP).subscribe({
      next: (response) => {
        this.lophocphanDetails = response;
      }
    });
  }

  loadLopHocPhanSinhVien(maLHP: string){
    this.lopHocPhanService.getLopHocPhanSinhVien(maLHP).subscribe((result: LopHocPhan[]) => (this.lophocphansvs = result,this.updateThongKe()));
  }
  updateDiem(ketqualhp: LopHocPhan){
    this.diemDetails.maLHP = ketqualhp.maLHP;
    this.diemDetails.maSV = ketqualhp.maSV;
    this.diemDetails.diem = ketqualhp.diem;
    this.lopHocPhanService.updateDiem(this.diemDetails).subscribe({
      next: (response) => {
        this.router.navigate(['/read-classgv']);
        location.reload();
      }
    });
  }
  updateThongKe() {
      this.lophocphansvs.forEach((lophocphan) => {
        const diem = lophocphan.diem!;
          if (diem < 5) {
            this.y++;
          } else if (diem >= 5 && diem < 6.5) {
            this.tb++;
          } else if (diem >= 6.5 && diem < 8) {
            this.k++;
          } else if (diem >= 8 && diem < 9) {
            this.g++;
          } else if (diem >= 9) {
            this.xs++;
          }
      });
      this.showChart(this.y,this.tb,this.k,this.g,this.xs);
  }
  showChart(y:number,tb:number,k:number,g:number,xs:number){
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Yếu', 'Trung bình', 'Khá', 'Giỏi', 'Xuất sắc'],
        datasets: [{
          label: 'Số lượng SV',
          data: [y, tb, k, g, xs],
          borderWidth: 1,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)','rgba(75, 192, 192, 0.2)', 'rgba(70, 170, 54, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)','rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(70, 170, 54, 1)'],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  exportexcel() {
    /**passing table id**/
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

}
