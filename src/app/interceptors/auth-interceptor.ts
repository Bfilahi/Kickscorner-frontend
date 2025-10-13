import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth-service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);

  const authUrl: string = environment.AUTH_URL;

  if(req.url.includes(`${authUrl}/login`) || req.url.includes(`${authUrl}/register`))
    return next(req);

  const token: string | null = auth.getToken();

  if(token){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq);
  }

  return next(req);
};
