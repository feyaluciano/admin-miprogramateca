import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';
import { EstadoUsuarioAdminService } from '../usuariosadmin/estado-usuario.service';
import { Archivo } from 'src/app/models/archivo-interface';

@Injectable({
  providedIn: 'root'
})
export class TiposRecursosService {

  api_url:String=environment.apiEndPoint; 
  estadoUsuarioAdminService: EstadoUsuarioAdminService;
  
  constructor(private _http:HttpClient) { 



   }


   getTipoRecursoPorIdTipoRecurso(IdTipoRecurso):Observable<TipoRecurso>{   
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token;   
    return this._http.get<any>(`${this.api_url}/api/v1/UnTipoRecurso/${IdTipoRecurso}`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });
  }


   delete(IdTipoRecurso:number):Observable<any>{   
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token; 
    const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }    
    return this._http.get<any>(`${this.api_url}/api/v1/TipoRecurso/delete/${IdTipoRecurso}`, {headers : mheaders
  });
  }


  enviarTipoRecurso(tiporecurso:TipoRecurso):Observable<any>{       
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token;   
  const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
  const body = {    
  }
     return this._http.post<any>(`${this.api_url}/api/v1/TipoRecurso/storeObjetoCompleto`, tiporecurso,{headers : mheaders
  });      
  }
  



  cambiarDeEstado(IdTipoRecurso:number):Observable<any>{   
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token; 
    const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }    
    return this._http.get<any>(`${this.api_url}/api/v1/TipoRecurso/cambiardeestado/${IdTipoRecurso}`, {headers : mheaders
  });
  }

   buscar(tiporecurso:TipoRecurso):Observable<any>{  
    //console.log(recurso);  
    this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    var token=this.estadoUsuarioAdminService.Token;   
  const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
  const body = { 
  }
     return this._http.post<any>(`${this.api_url}/api/v1/TipoRecurso/buscar`, tiporecurso);      
  }

  getAll():Observable<any>{  //para menu              
    return this._http.get<any>(`${this.api_url}/api/v1/TipoRecurso/tiposrecursos`);      
}







}
