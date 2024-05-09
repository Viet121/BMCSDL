import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CMT_LHP } from 'src/app/models/cmtlhp';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-read-cmt',
  templateUrl: './read-cmt.component.html',
  styleUrls: ['./read-cmt.component.css']
})
export class ReadCmtComponent implements OnInit{
  cmts: CMT_LHP[] = [];
  constructor(private route: ActivatedRoute,private cmtService: SinhvienService, private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const maLHP = params.get('maLHP');
        if(maLHP){
          this.loadCmts(maLHP);
        } 
      }
    })
  }
  loadCmts(maLHP: string){
    this.cmtService.getCmts(maLHP).subscribe((result: CMT_LHP[]) => (this.cmts = result));
  }

}
