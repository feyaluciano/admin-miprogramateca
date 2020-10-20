import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,  HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

   constructor(private _http:HttpClient) { }


  api_url:String=environment.apiEndPoint;        
  login(email, password):Observable<any>{    
      var observable:Observable<any>=this._http.post<any>(`${this.api_url}/api/v1/auth/loginadmin`,{
        email,password     
      });
      return observable;//,{headers: headers}
      //SI LE SACO LOS HEADERS FUNCIONA
  }


  chequearUnEmail(email):Observable<any>{    
    var observable:Observable<any>=this._http.post<any>(`${this.api_url}/api/v1/auth/chequearemail`,{
      email    
    });
    return observable;//,{headers: headers}
  
}




}



  

