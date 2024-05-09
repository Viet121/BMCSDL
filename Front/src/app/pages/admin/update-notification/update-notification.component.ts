import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ThongBao } from 'src/app/models/thongbao';
import { SinhvienService } from 'src/app/services/sinhvien.service';
@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.css']
})
export class UpdateNotificationComponent implements OnInit{
  addNotification: FormGroup;
  thongbaoDetails : ThongBao = {
    maTB: '',
    tieuDe: '',
    noiDung: '',
    ngayTB: '2023-01-01'
  }
  constructor(
    private toast: NgToastService, 
    private fb: FormBuilder, 
    private thongBaoService: SinhvienService, 
    private router: Router,
    private dialogRef: MatDialogRef<UpdateNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { maTB: string }){ 
      this.addNotification = this.fb.group({
        maTB: '',
        tieuDe: '',
        noiDung: '',
        ngayTB: '2023-01-01'
      });
    }
  ngOnInit(): void {
    const maTB = this.data.maTB;
    if(maTB){
      this.thongBaoService.getNotification(maTB).subscribe({
        next: (response) => {
          this.thongbaoDetails = response;
        }
      });
    }
  }
  onFormSubmit(){
    if(this.addNotification.valid){
      console.log(this.addNotification.value);
      this.thongBaoService.updateThongBao(this.thongbaoDetails).subscribe({
        next: (val: any) => {
          this.toast.success({detail:"SUCCESS", summary:"Sửa thông báo thành công", duration: 5000});
          this.dialogRef.close(true);
        }    
      });
    }
  }
  
}
