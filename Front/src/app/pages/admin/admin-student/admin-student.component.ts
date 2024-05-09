import { Component, OnInit } from '@angular/core';
import { SinhVien } from '../../../models/sinhvien';
import { SinhvienService } from '../../../services/sinhvien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InforService } from 'src/app/services/infor.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css'],
})
export class AdminStudentComponent implements OnInit{
  currentPage: number = 1; 
  selectedFile: File | undefined;
  sinhviens: SinhVien[] = [];
  public role!:string;
  public fullName!:string;
  constructor(private route: ActivatedRoute,private sinhVienService: SinhvienService,private inforService : InforService, 
    private router: Router, private datePipe: DatePipe,private toast: NgToastService,){}

  ngOnInit() : void{
    this.loadSinhViens();
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.sinhVienService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.sinhVienService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  } 

  importData(): void {
    if (this.selectedFile) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        this.sinhVienService.importSinhVienData(this.convertArrayToSinhVienModel(data)).subscribe({
          next: (res) => {
            this.toast.success({detail:"SUCCESS", summary:"Thêm sinh viên thành công", duration: 5000});
            console.log(res);
            this.loadSinhViens();
          },
          error: (error) => {
            this.toast.error({detail:"ERROR", summary:"Thêm sinh viên thất bại", duration: 5000});
            console.error(error);
          }
        });
      };

      reader.readAsBinaryString(this.selectedFile);
    }
  }
  
  convertArrayToSinhVienModel(data: any[]): SinhVien[] {
    const sinhVienData: SinhVien[] = [];

    for (let i = 1; i < data.length; i++) {
      
      const sinhVienModel: SinhVien = {
        maSV: data[i][0],
        tenSV: data[i][1],
        ngaySinh: this.datePipe.transform(data[i][2], 'yyyy-MM-dd') as unknown as Date,
        gioiTinh: data[i][3],
        sdt: data[i][4],
        diaChi: data[i][5],
        namNhapH: data[i][6],
        maCTDT: data[i][7]
      };

      sinhVienData.push(sinhVienModel);
    }

    return sinhVienData;
  }

  loadSinhViens(){
    this.sinhVienService.getSinhViens().subscribe((result: SinhVien[]) => (this.sinhviens = result));
  }

  searchText: string = '';
  isSearching: boolean = false; 
  searchSinhVien(maSV: string) {
    this.isSearching = true;
    if (maSV) {
      this.sinhVienService.getSinhVienByMaSV(maSV).subscribe((result: SinhVien[]) => (this.sinhviens = result));
    } else {
      this.loadSinhViens();
    }
  }
  deleteUserForm(email: string){
    this.sinhVienService.deleteUserForm(email).subscribe({
      next: (response) => {
        this.router.navigate(['/admin-student']);
        this.loadSinhViens();
      }
    });
  }

  deleteSinhVien(maSV: string) {
    const confirmation = window.confirm('Bạn có muốn xoá sinh viên này không !');
    if (confirmation) {
      // Nếu người dùng xác nhận xóa, thì thực hiện hàm delete
      this.sinhVienService.deleteSinhVien(maSV).subscribe({
        next: (response) => {
          this.deleteUserForm(maSV);
        }
      });
    }
  }
  profile(){
    if (this.role === 'admin') {
      this.router.navigate(['/admin-profile'])
    } else if (this.role === 'teacher') {
      this.router.navigate(['/teacher-profile'])
    } else {
      this.router.navigate(['/student-profile'])
    }
  }
  logOut(){
    this.sinhVienService.logOut();
  }

} 



