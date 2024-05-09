import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserForm } from 'src/app/models/userform';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit{
  changePassForm!: FormGroup;
  userFromDetails: UserForm = {
    email: '',
    name: '',
    password: '',
    user_type: '',
  };
  constructor(private fb: FormBuilder, 
    private loginService: SinhvienService, 
    private router: Router,
    private toast: NgToastService,
    private infor: InforService
  ){}
  ngOnInit(): void {
    this.changePassForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      passwordnew: ['',Validators.required],
      passwordnew2: ['',Validators.required],
    })
  }

  upDatePass(email: string){
    this.loginService.updatePass(email, this.userFromDetails).subscribe({
      next: (response) => {
        this.router.navigate(['/admin-teacher']);
      }
    });
  }
  changePass() {
    if (this.changePassForm.valid) {
      console.log(this.changePassForm.value);
      console.log(this.changePassForm.value.email);
      
      this.loginService.login(this.changePassForm.value)
        .subscribe({
          next: (res) => {
            if(this.changePassForm.value.passwordnew===this.changePassForm.value.passwordnew2){
              this.userFromDetails.password = this.changePassForm.value.passwordnew;
              this.loginService.updatePass(this.changePassForm.value.email, this.userFromDetails).subscribe({
                next: (res) =>{
                  this.toast.success({detail:"SUCCESS", summary:'Đổi mật khẩu thành công', duration: 5000});
                  this.changePassForm.reset();
                  this.loginService.logOut();
                },
                error: (err) => {
                  this.toast.error({detail:"ERROR", summary:err?.error.message, duration: 5000});
                  console.log(err?.error.message)
                }
              })
            }
            else{
              this.toast.error({detail:"ERROR", summary:'Mật khẩu mới không khớp', duration: 5000});
            }
          },
          error: (err) => {
            this.toast.error({detail:"ERROR", summary:err?.error.message, duration: 5000});
            console.log(err?.error.message)
          }
        });
    } else {
      this.validateAllFormFileds(this.changePassForm);
    }
}
// có thể dưa hàm này ra file khác để có thể gọi đến và sử dụng chung như các form thêm thông tin và kiểm tra thông tin có được nhập chưa
  private validateAllFormFileds(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if (control instanceof FormGroup){
        this.validateAllFormFileds(control)
      }
    })
  }
}
 