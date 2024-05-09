import { Component, OnInit } from '@angular/core';
import { MonHoc } from '../../../models/monhoc';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';
import { InforService } from 'src/app/services/infor.service';

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css']
})
export class AdminSubjectComponent implements OnInit{
  monhocs: MonHoc[] = [];
  public role!:string;
  public fullName!:string;
  currentPage: number=1;
  constructor(private route: ActivatedRoute,private monHocService: SinhvienService,private inforService : InforService, private router: Router){}

  ngOnInit(): void {
    this.loadMonHocs();
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.monHocService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.monHocService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  logOut(){
    this.monHocService.logOut();
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
  loadMonHocs(){
    this.monHocService.getMonHocs().subscribe((result: MonHoc[]) => (this.monhocs = result));
  }
  searchText: string = '';
  isSearching: boolean = false;
  searchMonHoc(maMH: string) {
    this.isSearching = true;
    if (maMH) {
      this.monHocService.getMonHocByMaMH(maMH).subscribe((result: MonHoc[]) => (this.monhocs = result));
    } else {
      // If the search query is empty, load the full list of students.
      this.loadMonHocs();
    }
  }
  deleteMonHoc(maMH: string) {
    const confirmation = window.confirm('Bạn có muốn xoá môn học này không !');
    if (confirmation) {
      // Nếu người dùng xác nhận xóa, thì thực hiện hàm delete
      this.monHocService.deleteMonHoc(maMH).subscribe({
        next: (response) => {
          this.loadMonHocs();
        }
      });
    }
  }
}
