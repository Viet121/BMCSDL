import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ThongBao } from 'src/app/models/thongbao';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit{
  addNotification: FormGroup; 
  constructor(
    private toast: NgToastService, 
    private fb: FormBuilder, 
    private thongBaoService: SinhvienService, 
    private router: Router,
    private dialogRef: MatDialogRef<AddNotificationComponent>){ 
      this.addNotification = this.fb.group({
        maTB: '',
        tieuDe: '',
        noiDung: '',
        ngayTB: '2023-01-01'
      });
    }
  ngOnInit(): void {
    
  }
  onFormSubmit(){
    if(this.addNotification.valid){
      console.log(this.addNotification.value);
      this.thongBaoService.addThongBao(this.addNotification.value).subscribe({
        next: (val: any) => {
          this.toast.success({detail:"SUCCESS", summary:"Thêm thông báo thành công", duration: 5000});
          this.dialogRef.close(true);
        }    
      });
    }
  }
  
}