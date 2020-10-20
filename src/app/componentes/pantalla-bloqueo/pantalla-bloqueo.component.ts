import { Component, OnInit } from '@angular/core';
import { EstadoUsuarioAdminService } from 'src/app/servicios/usuariosadmin/estado-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuariosadmin/usuarios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pantalla-bloqueo',
  templateUrl: './pantalla-bloqueo.component.html',
  styleUrls: ['./pantalla-bloqueo.component.css']
})
export class PantallaBloqueoComponent implements OnInit {
  reingresarFormulario:FormGroup; 
  mostrarMensajeError=false;
  nombreConectado:String="";
  apellidoConectado:String="";
  constructor(private router:Router,private _apiUsuario:UsuariosService,private _estadoUsuario:EstadoUsuarioAdminService,private _builder:FormBuilder) { 
    this.apellidoConectado=_estadoUsuario.Apellido;
    this.apellidoConectado=_estadoUsuario.Nombre;

    this.reingresarFormulario=this._builder.group({
      password:['',[Validators.required]],      
    });
  }
  reingresar(){         
    if (this.reingresarFormulario.valid) {     
      var email=this._estadoUsuario.Email;    
      const password=this.reingresarFormulario.value.password;   
    return this._apiUsuario.login(email,password).subscribe(
      (respuesta) => {        
        console.log("CORRECTO"+JSON.stringify(respuesta.user));        
        sessionStorage.setItem('usuarioAdminLogeado', JSON.stringify(respuesta.user));
        sessionStorage.setItem('tokenAdminLogeado', JSON.stringify(respuesta.token));       
        this.router.navigate(['/panel']);                     
        },
    (error) => {
      alert("error al ingresar");
      console.log("error"+JSON.stringify(error));      
      this.mostrarMensajeError=true;                    
        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  
          }
          else {
            this.reingresarFormulario.markAllAsTouched();
  
          }
  
  }


  ngOnInit(): void {
  }

}
