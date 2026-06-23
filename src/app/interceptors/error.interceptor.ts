import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.navigate(['/login']);
      } else if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong on the server. Please try again later.',
          confirmButtonColor: '#4f46e5'
        });
      } else if (error.status === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Connection Error',
          text: 'Unable to connect to the backend server. Please verify the API is running.',
          confirmButtonColor: '#4f46e5'
        });
      }
      return throwError(() => error);
    })
  );
};
