import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoUsuarioAdminService } from 'src/app/servicios/usuariosadmin/estado-usuario.service';
declare var $: any;

@Component({
  selector: 'app-menu-izquierdo',
  templateUrl: './menu-izquierdo.component.html',
  styleUrls: ['./menu-izquierdo.component.css']
})
export class MenuIzquierdoComponent implements OnInit {
  estadoUsuarioService:EstadoUsuarioAdminService;
  constructor(private router:Router,private _estadoUsuario:EstadoUsuarioAdminService) { }
  

  ngOnInit(): void {
    //alert("menu");
   // $(".main-sidebar").hide(); // avoid dependency on #id
    //navMain.collapse('hide');
    // navMain.on("click", "a:not([data-toggle])", null, function () {
    //     navMain.collapse('hide');
    // });


    $("#menu-gris").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });


    
  }

  salir(){
    // seteo el sesion storage en null, seteo la variable para informar que no esta logueado para no mostrar el form de logueo
   sessionStorage.setItem('usuarioAdminLogeado',null);
   sessionStorage.setItem('tokenAdminLogeado', null);
   //this.usuarioEstaLogueado=false;
   this.router.navigate(['login']);   
  //  this.ocultarAutenticacion();//oculto la ventana
  }


  bloquear(){        
    this._estadoUsuario.Token=null;
    sessionStorage.setItem('usuarioAdminLogeado',JSON.stringify(this._estadoUsuario));         
    sessionStorage.setItem('tokenAdminLogeado', null);    
    this.router.navigate(['reingresar']);     
  }

}
