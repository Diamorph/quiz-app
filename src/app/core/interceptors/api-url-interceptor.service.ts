import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UrlHelper} from '../../helpers/url.helper';

@Injectable()
export class ApiUrlInterceptorService implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({url: UrlHelper.createUrl(request.url)}));
  }
}
