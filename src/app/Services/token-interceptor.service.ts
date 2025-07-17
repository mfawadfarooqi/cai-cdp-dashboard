import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const offcanvasService = inject(NgbOffcanvas);
  const token = JSON.parse(localStorage.getItem('user') || '');

  let clonedReq = req;

  if (req.url.includes('uaa/get-token')) {
    clonedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });
  } else {
    const headers: any = {};

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    if (
      (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') &&
      !(req.url.includes('/create-alert') || req.url.includes('/update-alert'))
    ) {
      headers['Content-Type'] = 'application/json';
    }

    clonedReq = req.clone({ setHeaders: headers });
  }

  return next(clonedReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        if (req.url.includes('uaa/change-password')) {
          console.error('Old password mismatch - 401 error.');
        } else {
          localStorage.removeItem('user');
          router.navigate(['login']);
          offcanvasService.dismiss();
        }
      } else if (error.status === 0) {
        router.navigate(['login']);
        offcanvasService.dismiss();
      }
      return throwError(() => error);
    })
  );
};
