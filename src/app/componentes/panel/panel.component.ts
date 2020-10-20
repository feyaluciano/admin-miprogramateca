import { Component, OnInit } from '@angular/core';
import { EstadoUsuarioAdminService } from 'src/app/servicios/usuariosadmin/estado-usuario.service';
import { Router } from '@angular/router';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  usuarioEstaLogueado:boolean=false;

  estadoUsuarioService:EstadoUsuarioAdminService;

  public cantRecursos:String="0";
  public cantTRecursos:String="0";

  constructor(private router:Router,private _recursoservice:RecursosService) { }

  


  getTotales(){
    return this._recursoservice.getTotales().subscribe(
      (respuesta) => {  
        this.cantRecursos=  respuesta.cantRecursos;
        this.cantTRecursos=  respuesta.cantTRecursos;        
        },
    (error) => {},
        () => {         
            });
  }

  ngOnInit(): void {
    this.getTotales();
    



  }


  

}
