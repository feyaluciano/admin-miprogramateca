import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioAdminService {
  IdUsuarioAdmin:Number;
  Email:String;
  Token:String;
  Nombre:String;
  Apellido:String;		    
  Activo:Boolean;    
constructor() { 
var user= JSON.parse(sessionStorage.getItem('usuarioAdminLogeado'));
var token= sessionStorage.getItem('tokenAdminLogeado');
if (user!=null) {
console.log("Entro a setear usuario");
  this.IdUsuarioAdmin=user.IdUsuario;
  this.Nombre=user.Nombre;
  this.Email=user.Email;
  this.Apellido=user.Apellido;
  this.Token=token;
}
}
estaLogueado():boolean{
  if (this.IdUsuarioAdmin>0){
    return true;
    } else {
        return false;  
  }
 }
}
