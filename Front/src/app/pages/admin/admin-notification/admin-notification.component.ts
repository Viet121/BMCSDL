import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ThongBao } from 'src/app/models/thongbao';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { UpdateNotificationComponent } from '../update-notification/update-notification.component';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit{
  thongbaos: ThongBao[] = [];
  public role!:string;
  public fullName!:string;
  
  constructor(private route: ActivatedRoute,private thongBaoService: SinhvienService,private inforService : InforService,
     private router: Router, private dialog: MatDialog){}
  
  ngOnInit(): void {
    this.loadThongBaos2();
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.thongBaoService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.thongBaoService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  /*///////////*/ 
  loadThongBaos(){
    this.thongBaoService.getNotifications().subscribe((result: ThongBao[]) => (this.thongbaos = result));
  }
  loadThongBaos2() {
    this.thongBaoService.getNotifications().subscribe((result: ThongBao[]) => {
        this.thongbaos = [...result].reverse();
    });
  }
  /*///////////*/
  logOut(){
    this.thongBaoService.logOut();
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
  /*///////////*/
  searchText: string = '';
  isSearching: boolean = false;
  searchThongBao(tieuDe: string) {
    this.isSearching = true;
    if (tieuDe) {
      this.thongBaoService.getNotificationByTieuDe(tieuDe).subscribe((result: ThongBao[]) => {
        this.thongbaos = [...result].reverse();
      });
    } else {
      this.loadThongBaos2();
    }
  }
  /*///////////*/
  openAddNotification(){
    const dialogRef = this.dialog.open(AddNotificationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => { 
        if (val) {
          this.loadThongBaos2();
        }
      },
    });
  }
  deleteNotification(maTB: string) {
    const confirmation = window.confirm('Bạn có muốn xoá thông báo này không !');
    if (confirmation) {
      // Nếu người dùng xác nhận xóa, thì thực hiện hàm delete
      this.thongBaoService.deleteThongBao(maTB).subscribe({
        next: (response) => {
          this.loadThongBaos2();
        }
      });
    }
  }
  openUpdateNotification(maTB: string){
    const dialogRef = this.dialog.open(UpdateNotificationComponent, {
      data: { maTB: maTB },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => { 
        if (val) {
          this.loadThongBaos2();
        }
      },
    });
  }
  
}

