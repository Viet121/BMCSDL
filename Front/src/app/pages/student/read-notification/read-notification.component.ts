import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThongBao } from 'src/app/models/thongbao';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-read-notification',
  templateUrl: './read-notification.component.html',
  styleUrls: ['./read-notification.component.css']
})
export class ReadNotificationComponent implements OnInit{
  thongbaos: ThongBao[] = [];
  public role!:string;
  public fullName!:string;
  constructor(private route: ActivatedRoute,private thongBaoService: SinhvienService,private inforService : InforService, private router: Router){}
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
  loadThongBaos(){
    this.thongBaoService.getNotifications().subscribe((result: ThongBao[]) => (this.thongbaos = result));
  }
  loadThongBaos2() {
    this.thongBaoService.getNotifications().subscribe((result: ThongBao[]) => {
        this.thongbaos = [...result].reverse();
    });
  }
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
}
