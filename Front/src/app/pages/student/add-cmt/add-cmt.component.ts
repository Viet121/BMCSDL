import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-add-cmt',
  templateUrl: './add-cmt.component.html',
  styleUrls: ['./add-cmt.component.css']
})
export class AddCmtComponent implements OnInit{
  addCmtForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { maLHP: string },private toast: NgToastService, private fb: FormBuilder, private cmtService: SinhvienService, private router: Router,private dialogRef: MatDialogRef<AddCmtComponent>,){
    this.addCmtForm = this.fb.group({
      maCMT: '',
      maLHP: data.maLHP, 
      noiDung: '',
      ngayCMT: '2023-01-01'
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onFormSubmit(){
    if(this.addCmtForm.valid){
      console.log(this.addCmtForm.value);
      this.cmtService.addCmt(this.addCmtForm.value).subscribe({
        next: (val: any) => {
          this.toast.success({detail:"SUCCESS", summary:"Thêm nhận xét thành công", duration: 5000});
          this.dialogRef.close(true);
        }    
      });
    }
  }
  
}
