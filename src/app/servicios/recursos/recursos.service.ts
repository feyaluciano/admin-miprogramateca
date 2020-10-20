import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { EstadoUsuarioAdminService } from '../usuariosadmin/estado-usuario.service';
//import { Recurso } from 'src/app/models/recurso-interface';
import { environment } from 'src/environments/environment';
import { Recurso } from 'src/app/models/recurso-interface';


@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  estadoUsuarioAdminService:EstadoUsuarioAdminService;
  api_url:String=environment.apiEndPoint;  

  constructor(private _http:HttpClient) { }


  getRecursos():Observable<any>{      
   // alert("la pagg"+page);     
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token;   
    return this._http.get<any>(`${this.api_url}/api/v1/Recursos`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });
  


  
}

getRecursosPaginado(page:number):Observable<any>{      
  // alert("la pagg"+page);     
   this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
   var token=this.estadoUsuarioAdminService.Token;   
   return this._http.get<any>(`${this.api_url}/api/v1/RecursosPaginado/${page}`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
 });   
}


getTotales():Observable<any>{      
  // alert("la pagg"+page);     
   this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
   var token=this.estadoUsuarioAdminService.Token;   
   return this._http.get<any>(`${this.api_url}/api/v1/TotalesPanel`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
 });   
}




getRecursosPorIdRecurso(IdRecurso):Observable<any>{   
  this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
  var token=this.estadoUsuarioAdminService.Token;   
  return this._http.get<any>(`${this.api_url}/api/v1/UnRecurso/${IdRecurso}`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
});
}

delete(IdRecurso:number):Observable<any>{   
  this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
  var token=this.estadoUsuarioAdminService.Token; 
  const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }    
  return this._http.get<any>(`${this.api_url}/api/v1/Recurso/delete/${IdRecurso}`, {headers : mheaders
});
}






buscar(recurso:Recurso):Observable<any>{   
const body = { 
}
   return this._http.post<any>(`${this.api_url}/api/v1/Recurso/buscar`, recurso);      
}



enviarRecurso(recurso:Recurso):Observable<any>{       
  const body = { 
}
   return this._http.post<any>(`${this.api_url}/api/v1/Recurso/storeObjetoCompleto`, recurso);      
}


}