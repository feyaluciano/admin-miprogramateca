import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EstadoUsuarioAdminService } from './estado-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {
//destino:String="";
  constructor(private authService: EstadoUsuarioAdminService, private router: Router) {
    // router.events.subscribe((url:any) => 
    // console.log("1"+url)
    
    // );
    
    // console.log("2"+router.url);  // to print only path eg:"/login"


   }

  canActivate() {   
    //alert("can"); 
    //alert(this.destino);      
      if (this.authService.estaLogueado()===false) {      
          this.router.navigate(['/login']);
          return false;
      }

      return true;
  }
}
