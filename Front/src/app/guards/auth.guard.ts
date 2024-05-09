import { CanActivateFn, Router } from '@angular/router';
import { SinhvienService } from '../services/sinhvien.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { InforService } from '../services/infor.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(SinhvienService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const inforService = inject(InforService);

  if (await auth.isLoggedIn()) {
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && !auth.hasRoles(requiredRoles)) {
      toast.error({ detail: "ERROR", summary: "Bạn không có quyền truy cập!" });
      router.navigate(['not-found']);
      return false;
    }
    
    return true;
  } else {
    toast.error({ detail: "ERROR", summary: "Vui lòng đăng nhập trước!" });
    router.navigate(['login']);
    return false;
  }
};