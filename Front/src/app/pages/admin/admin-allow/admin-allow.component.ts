import { Component, OnInit } from '@angular/core';
import { CapPhep } from '../../../models/capphep';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from '../../../services/sinhvien.service';
import { InforService } from 'src/app/services/infor.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-allow',
  templateUrl: './admin-allow.component.html',
  styleUrls: ['./admin-allow.component.css']
})
export class AdminAllowComponent implements OnInit{
  cappheps: CapPhep[] = [];

  capphepDetails: CapPhep = {
    maCP: '',
    tenCP: '',
    tinhTrang: 0,
  }
  public role!:string;
  public fullName!:string;
  constructor(private route: ActivatedRoute,private capPhepService: SinhvienService,private toast: NgToastService,private inforService : InforService, private router: Router){}
  
  ngOnInit(): void {
    this.loadCapPhep('DKHP');
    this.inforService.getName()
    .subscribe(val=>{
      const fullNameFromToken = this.capPhepService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.inforService.getRole()
    .subscribe(val=>{
      const roleFromToken = this.capPhepService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  loadCapPhep(maCP: string){
    this.capPhepService.getCapPhep(maCP).subscribe({
      next: (response) => {
        this.capphepDetails = response;
      }
    });
  }
  loadCapPheps(){
    this.capPhepService.getCapPheps().subscribe((result: CapPhep[]) => (this.cappheps = result));
  }
  updateCapPhep(){
    this.capPhepService.updateCapPhep(this.capphepDetails).subscribe({
      next: (response) => {
        //this.router.navigate(['/admin-allow']);
        this.loadCapPhep('DKHP');
        this.toast.success({detail:"SUCCESS", summary:"Lưu thành công", duration: 5000});
      }
    });
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
    this.capPhepService.logOut();
  }
  searchText: string = '';
  isSearching: boolean = false;
  searchCapPhep(maCP: string) {
    
  }

}
