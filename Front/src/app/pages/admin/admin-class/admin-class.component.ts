import { Component, OnInit } from '@angular/core';
import { LopHocPhan } from '../../../models/lophocphan';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';
import { InforService } from 'src/app/services/infor.service';

@Component({
  selector: 'app-admin-class',
  templateUrl: './admin-class.component.html',
  styleUrls: ['./admin-class.component.css'] 
})
export class AdminClassComponent implements OnInit{
  currentPage: number = 1; 
  lophocphans: LopHocPhan[] = [];
  public role!:string;
  public fullName!:string;
  constructor(private route: ActivatedRoute,private lopHocPhanService: SinhvienService,private inforService : InforService, private router: Router){}

  ngOnInit(): void {
    this.loadLopHocPhans();
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.lopHocPhanService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.lopHocPhanService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  loadLopHocPhans(){
    this.lopHocPhanService.getLopHocPhans().subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
  }
  logOut(){
    this.lopHocPhanService.logOut();
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

  searchText: string = '';
  isSearching: boolean = false;
  searchSinhVien(maLHP: string) {
    this.isSearching = true;
    if (maLHP) {
      this.lopHocPhanService.getLopHocPhanByMaLHP(maLHP).subscribe((result: LopHocPhan[]) => (this.lophocphans = result));
    } else {
      // If the search query is empty, load the full list of students.
      this.loadLopHocPhans();
    }
  }

  deleteLopHocPhan(maLHP: string) {
    const confirmation = window.confirm('Bạn có muốn xoá lớp học phần này không!');
    if (confirmation) {
      // Nếu người dùng xác nhận xóa, thì thực hiện hàm delete
      this.lopHocPhanService.deleteLopHocPhan(maLHP).subscribe({
        next: (response) => {
          this.loadLopHocPhans();
        }
      });
    }
  }

}
