import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';
import { EstadoUsuarioAdminService } from '../usuariosadmin/estado-usuario.service';



@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  api_url:String=environment.apiEndPoint; 
  
  estadoUsuarioAdminService: EstadoUsuarioAdminService;
  constructor(private _http:HttpClient) { 



   }

   
// uploadFile(File): Observable<any> {
//   console.log(File);
//   var peticion = "api/Subir/";
//   var json = JSON.stringify(File);
//   console.log(File);
//   var headers = new HttpHeaders().set("Content-Type", "application/json");
//   //alert(JSON.stringify(File));
//   return this._http.post(`${this.api_url}/api/v1/Archivo/subirImagen`, File, { headers });
// }


uploadFile(File): Observable<any> {
  console.log("en serrrrrrrrrrrrrrrrrrrrrrrrr");
  var peticion = "api/Subir/";
  var json = JSON.stringify(File);
 // console.log(File);
  //var headers = new HttpHeaders().set("Content-Type", "application/json");
  //alert(JSON.stringify(File));
  //return this._http.post(`${this.api_url}/api/v1/TipoRecurso/subirImagen`, File, { headers });


  this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
  var token=this.estadoUsuarioAdminService.Token;   
const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
const body = {    
}
   return this._http.post<any>(`${this.api_url}/api/v1/Archivo/subirImagen`,File,{headers : mheaders
});      


}



}
