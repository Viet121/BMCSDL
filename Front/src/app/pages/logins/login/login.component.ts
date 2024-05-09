import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InforService } from 'src/app/services/infor.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private loginService: SinhvienService, 
    private router: Router,
    private toast: NgToastService, 
    private infor: InforService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  EmailOrPassExists: boolean = false;
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      console.log(this.loginForm.value.email);
      
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            
            this.loginService.storeToken(res.token);
            const tokenPayload = this.loginService.decodedToken();
            this.infor.setName(tokenPayload.name);
            this.infor.setRole(tokenPayload.role);
            this.infor.setEmail(tokenPayload.email);
            if (tokenPayload.role === 'admin') {
              this.router.navigate(['/admin-home']).then(() => {
                window.location.reload();
              });
            } else if (tokenPayload.role === 'teacher') {
              this.router.navigate(['/teacher-home']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/student-home']).then(() => {
                window.location.reload();
              });
            }
            
          },
          error: (err) => {
            this.toast.error({detail:"ERROR", summary:err?.error.message, duration: 5000});
            console.log(err?.error.message)
          }
        });
    } else {
      this.validateAllFormFileds(this.loginForm);
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
