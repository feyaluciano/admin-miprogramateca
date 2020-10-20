import { Component, OnInit } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';
import { Recurso } from 'src/app/models/recurso-interface';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiposRecursosService } from 'src/app/servicios/tipos-recursos/tipos-recursos.service';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';
import { EstadoUsuarioAdminService } from 'src/app/servicios/usuariosadmin/estado-usuario.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-listado-recursos',
  templateUrl: './listado-recursos.component.html',
  styleUrls: ['./listado-recursos.component.css']
})
export class ListadoRecursosComponent implements OnInit {
  recursos: Recurso[];
  idRecursoAEliminar:number; 
  
  totalItems:number;//TOTAL DE ITEMS DE LA TABLA, USADO PARA LA PAGINACION
  page: number;//PAGINA ACTUAL
  previousPage: number;//PAGINA ANTERIOR
  showPagination: boolean;//SI EL RESULTADO ES MENOR AL TAMAÑO DE LA PAGINA, NO MUESTRO LA PAGINACION
  
  sinOpcionesSeleccionadas:boolean=false;//MUESTRA UN ERROR SI NO SELECCIONO NINGUN CHECK


  recursoBuscar:Recurso={IdRecurso:0};//ES EL OBJETO QUE ENVIO AL BACKEND PARA BUSCAR

  
  formBusqueda: FormGroup;

  tiposrecursos:TipoRecurso; //PARA SELECT

  //**********************estadoUsuarioAdminService:EstadoUsuarioAdminService;


  //EL SIGIUENTE METODO NO LO USO, YA QUE AL DESARROLLAR UN FORMULARIO DE BUSQUEDA LO CAMBIE POR UN METODO LLAMADO BUSCAR
  // obtenerRecursos(page){   
  //   $("#cargandoTabla").show();         
  // return this._recursoservice.getRecursosPaginado(page).subscribe(     
  //     (respuesta) => {
  //       $("#cargandoTabla").hide();
  //      //alert(JSON.stringify(respuesta));
  //      this.recursos=JSON.parse(JSON.stringify(respuesta.data));      
       
  //      //MI PAGINACION SERA DE 10, POR LO TANTO SI HAY MENOS DE 10 RESULTADOS NO MUESTRO LA PAGINACION
  //      //respuesta.total CADA VEZ QUE VOY BUSCAR LOS ELEMENTOS, TAMBIEN TRAIGO EN ESE CAMPO, TOTAL, LA CANTIDAD TOTAL DE ELEMENTOS
  //      // PARA LA CONFIGURACION DEL PAGINADO
  //      if ((!respuesta && !respuesta.data) || (respuesta && respuesta.data && respuesta.data.length < 10)) {               
	// 		  this.showPagination = false;
	// 		}
	// 		else {
	// 		  this.recursos = respuesta.data;
	// 		  this.totalItems = this.totalItems=respuesta.total;
	// 		  this.showPagination = true;
	// 		}
      
  //       },
  //   (error) => {
  //    // console.log(JSON.stringify(error));
  //       },
  //       () => {
          
  //         console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
  //           }             
  //   );
  // }        
  


  cargarSelect(){    
    //CARGO EL COMPO DE TIPO DE RECURSOS         
    return this._apiTiposRecursos.getAll().subscribe(
      (respuesta) => {      
        this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));  
        console.log(this.tiposrecursos);                                         
        this.formBusqueda.get('tiporecurso').setValue(this.tiposrecursos[0]);       
        },
    (error) => {},
        () => {         
            });
          }

  buscar(pagina,modo){
    //VALIDACIONES DINAMICAS
    //SI NO HAY NINGUN CHECK SELECCIONADO AL CLICKAR EN BUSCAR MUESTRO EL MENSAJE DE ERROR     
    if ( !(this.formBusqueda.get("ChkTitulo").value) && !(this.formBusqueda.get("ChkTipoRecurso").value) &&  (modo==="inicial")  ) {
      this.sinOpcionesSeleccionadas=true;
      return false;
    } else {
      this.sinOpcionesSeleccionadas=false;
      //SI ESTA CHEQUEADO BUSCAR POR TITULO, AGREGO LA VALIDACION NECESARIA Y LO
      // MARCO COMO TOUCHED PARA QUE EJECUTE LA VALIDACION Y MUESTRE EL MENSAJE SI NO CUMPLE LA VALIDACION
      if ((this.formBusqueda.get("ChkTitulo").value)){                          
          var validaciones = [Validators.required];                     
           this.formBusqueda.get('Titulo').setValidators(validaciones);
           this.formBusqueda.get('Titulo').updateValueAndValidity(); 
           this.formBusqueda.get('Titulo').markAsTouched(); 
          if (!this.formBusqueda.valid){
           return false;
          } else {
            //SI EL FORMULARIO ES VALIDO SETEO EL OBJETO PARA ENVIAR AL BACKEND PARA BUSCAR
            if (this.formBusqueda.get("ChkTitulo").value) { this.recursoBuscar.OpcionBusquedaUno="portitulo",this.recursoBuscar.Titulo=this.formBusqueda.get("Titulo").value;this.recursoBuscar.page=pagina } 
          }        
      } else { this.recursoBuscar.OpcionBusquedaUno="";this.recursoBuscar.Titulo="";this.recursoBuscar.page=pagina }


      if ((this.formBusqueda.get("ChkTipoRecurso").value)){ 
        //alert();                         
        var validaciones = [Validators.required];                     
         this.formBusqueda.get('tiporecurso').setValidators(validaciones);
         this.formBusqueda.get('tiporecurso').updateValueAndValidity();
         this.formBusqueda.get('tiporecurso').markAsTouched(); 
        if (!this.formBusqueda.valid){
         return false;
        } else {
          if (this.formBusqueda.get("ChkTipoRecurso").value) { this.recursoBuscar.OpcionBusquedaDos="portipor";this.recursoBuscar.IdTipoRecurso=this.formBusqueda.get("tiporecurso").value.IdTipoRecurso;;this.recursoBuscar.page=pagina  } 
        }        
    } else {  this.recursoBuscar.OpcionBusquedaDos="";this.recursoBuscar.IdTipoRecurso=0;this.recursoBuscar.page=pagina }

 }//SI SELECCIONO ALGUN CHECK

    
  if (modo==="cancel") {
    //CUANDO CLICKEO EN CANCELAR TAMBIEN LLAMO A ESTE METODO BUSCAR, PERO ADEMAS RESETEO EL FORMULARIO
    this.formBusqueda.reset();
  }       
    this.previousPage = 1;                    
    $("#cargandoTabla").show();    
    
  return this._recursoservice.buscar(this.recursoBuscar).subscribe(     
      (respuesta) => {

  //----------------------NOTA:si la paginación es de menos de 10 elementos da error-----------
  if (respuesta.total <= 10)  { 
        //SI LA CANTIDAD ES MENOR QUE 10 no muestro la paginacion
          this.showPagination = false;
      }
        else {
          if (modo=="inicial") {
            this.page=1;
          }
          this.recursos = respuesta.data;          
          this.totalItems =respuesta.total;            
          this.showPagination = true;          
        }

        $("#cargandoTabla").hide();

       this.recursos=JSON.parse(JSON.stringify(respuesta.data));                         
        },
    (error) => {

        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );                       
  }        

  
  constructor(private router: Router,private _recursoservice:RecursosService,private config: NgbPaginationConfig,private _builder:FormBuilder,private _apiTiposRecursos:TiposRecursosService) {
    // this.estadoUsuarioAdminService = new EstadoUsuarioAdminService();
    
    // if (!this.estadoUsuarioAdminService.estaLogueado()){
    //   this.router.navigate(['login']);
    // }
    
    
    this.config.boundaryLinks = true;
    //CREO EL FORMULARIO VACIO DE VALIDACIONES, YA QUE LAS AGREGO A MEDIDA QUE SE CLICKEA EN EL CHECK CORRESPONDIENTE 
    //PARA VALIDAR POR EJEMPLO: SI ESTA CHEQUEADO EL CH1 NO VALIDAR EL INPUT DEL OTRO CHECK YA QUE UNO SOLO ES OBLIGATORIO
    this.formBusqueda = this._builder.group({
      Titulo: [''],      
      ChkTitulo: [false],
      ChkTipoRecurso: [false],
      tiporecurso: [''] 
  });
}  


   loadPage(page: number) { 
     //ESTE METODO ES LLAMADO CADA VEZ QIE SE HACE CLICK EN UNA PAGINA   
      this.previousPage = page;     
      this.buscar(this.page-1,"");    
  }
  

  deleteConfirmacion(){   
    return this._recursoservice.delete(this.idRecursoAEliminar).subscribe(
      (respuestad) => {
        if (respuestad.success==true){
         // alert("elimino"+this.idRecursoAEliminar);
         //alert(JSON.stringify(this.recursos[3]));
          //SI SE ELIMINO CORRECTAMENTE LO BORRO DEL ARRAY ASI SE REFLEJA EN LA VISTA
          this.recursos= this.recursos.filter(re => re.IdRecurso !== this.idRecursoAEliminar);      
        }        
        },
    (error) => {   
      alert(JSON.stringify(error));  
        },
        () => {         
          $('#modal-eliminar').modal('hide');
            }             
    );
  
  }

  delete(idRecurso){ 
    this.idRecursoAEliminar=idRecurso;
    //GUARDO EL ID QUE SE ELIMINARA PARA LUEGO OBTENERLO DESDE LA FUNCION
    // A LA QUE LLAMA EL MODAL
    $('#modal-eliminar').modal();     
  }



  cancelarBusqueda(modo){
    this.page =1;
    this.previousPage =1;
    $("#cargandoTabla").show();   
    this.recursoBuscar={IdRecurso:0}; 
    this.formBusqueda.reset();
    this.buscar(this.page-1,modo);//LE PASO LA PAGINA MENOS 1 PARA LUEGO TOMAR LOS ITEMS         
  }
  ngOnInit(): void {
    $('body').toggleClass("sidebar-open");
    //LA PAGINACION COMIENZA EN LA PAGINA 1
    this.page =1;
    this.previousPage =1;
    $("#cargandoTabla").show();


    this.recursoBuscar.OpcionBusquedaUno="";
    this.recursoBuscar.Titulo="";

    this.buscar(this.page-1,"");//LE PASO LA PAGINA MENOS 1 PARA LUEGO TOMAR LOS ITEMS 
    //OSEA, PAGINA 1 TRAERIA LOS PRIMEROS 10


    this.cargarSelect();

  }

}
