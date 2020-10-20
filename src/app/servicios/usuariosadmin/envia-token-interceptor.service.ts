import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EstadoUsuarioAdminService } from '../usuariosadmin/estado-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  estadoUsuarioAdminService:EstadoUsuarioAdminService;
  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
    let request = req;
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token;   
      
    const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
    if (token) {
      request = req.clone({
        setHeaders: mheaders
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if ( (err.status === 401) || (err.status === 500) ){
          //SI DA ERROR O 401 LO DIRIJO AL LOGIN
          //ACA SE DEEBRIA PREGUNTAR POR EL ERROR 401 PERO LA API DEVUELVE 500, VER POR QUE          
          this.router.navigateByUrl('login');
        }

        return throwError( err );

      })
    );
  }

}



