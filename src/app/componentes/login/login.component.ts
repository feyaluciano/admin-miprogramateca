import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoUsuarioAdminService } from 'src/app/servicios/usuariosadmin/estado-usuario.service';
import { UsuariosService } from 'src/app/servicios/usuariosadmin/usuarios.service';
import { MisValidacionesForm } from 'src/app/utiles/mis-validaciones-form'
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormulario:FormGroup; 
  mostrarMensajeError:boolean=false; 
  usuarioEstaLogueado:boolean=false;
  estadoUsuarioService:EstadoUsuarioAdminService;
  mensajeAlIngresarORegistrar:String;

  constructor(private _apiUsuario:UsuariosService,private _builder:FormBuilder,private router:Router) {
    this.loginFormulario=this._builder.group({
      password:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    });

    
 }


 login(){     
    
  if (this.loginFormulario.valid) {

  const email=this.loginFormulario.value.email;
  const password=this.loginFormulario.value.password;
  //AL SUBSCRIBIRME LO QUE ESTOY HACIENDO ES DECIRLE QUE CUANDO TERMINE DE EJECUTAR LA FUNCION LOGIN DEL SERVICIO
  // _apiUsuario, EJECUTE LO  QUE LE PASO POR PARAMETROS, EN ESTE CASO GUADRAR LA SESSION ETC, DE ESTE MODO "ESPERO" LA RESPUESTA Y NO DA ERROR
  // AL QUERER USAR EL TOKEN, ANTES DE HABERLO CONSEGUIDO, SERIA COMO UN CALLBACK EN JAVASCRIPT
  return this._apiUsuario.login(email,password).subscribe(
    (respuesta) => {
      //alert("correcto logn");
      console.log("CORRECTO"+JSON.stringify(respuesta.user));        
      sessionStorage.setItem('usuarioAdminLogeado', JSON.stringify(respuesta.user));
      sessionStorage.setItem('tokenAdminLogeado', JSON.stringify(respuesta.token));
      this.estadoUsuarioService = new EstadoUsuarioAdminService();
     // this.ocultarAutenticacion();
      this.usuarioEstaLogueado=true;

      this.mensajeAlIngresarORegistrar="Bienvenido";
      $("#modal1").modal();

      setTimeout (() => {
        $("#modal1").modal('hide');
        this.router.navigate(['/panel']);     
     }, 3000);               
      },
  (error) => {
    //alert("error en login");
    console.log("error"+JSON.stringify(error));
    sessionStorage.setItem('usuarioAdminLogeado', null);
    sessionStorage.setItem('tokenAdminLogeado', null);
    this.mostrarMensajeError=true;
    this.usuarioEstaLogueado=false;           
      },
      () => {
        console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
          }             
  );

        }
        else {
          this.loginFormulario.markAllAsTouched();

        }

}




//----------------------------------------------------------------------------------//
cerrarMensaje(){
  $("#modal1").modal('hide');
  this.router.navigate(['/']);     
}




  ngOnInit(): void {
  }

}
