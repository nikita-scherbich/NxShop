import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { BASE_API_URL } from '../../../environment';

export const baseUrlInterseptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(
    req.clone({
      url: BASE_API_URL + req.url,
    }),
  );
};
