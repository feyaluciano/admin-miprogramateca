import { Component, OnInit } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';
import { Recurso } from 'src/app/models/recurso-interface';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiposRecursosService } from 'src/app/servicios/tipos-recursos/tipos-recursos.service';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';



import pdfMake from '../../../../node_modules/pdfmake/build/pdfmake';
import pdfFonts from '../../../../node_modules/pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


declare var $: any;

@Component({
  selector: 'app-listado-tipos-recursos',
  templateUrl: './listado-tipos-recursos.component.html',
  styleUrls: ['./listado-tipos-recursos.component.css']
})
export class ListadoTiposRecursosComponent implements OnInit {
  //recursos: Recurso[];
  idTipoRecursoAEliminar:number; 
  idTipoRecursoACambiarEstado:number; 
  
  totalItems:number;//TOTAL DE ITEMS DE LA TABLA, USADO PARA LA PAGINACION
  page: number;//PAGINA ACTUAL
  previousPage: number;//PAGINA ANTERIOR
  showPagination: boolean;//SI EL RESULTADO ES MENOR AL TAMAÑO DE LA PAGINA, NO MUESTRO LA PAGINACION
  
  sinOpcionesSeleccionadas:boolean=false;//MUESTRA UN ERROR SI NO SELECCIONO NINGUN CHECK


  tipoRecursoBuscar:TipoRecurso={IdTipoRecurso:0,NombreTipoRecurso:""};//ES EL OBJETO QUE ENVIO AL BACKEND PARA BUSCAR

  
  formBusqueda: FormGroup;

  tiposrecursos:TipoRecurso[]; //PARA SELECT
  //pdfmake: any;


  

  buscar(pagina,modo){
    //VALIDACIONES DINAMICAS
    //SI NO HAY NINGUN CHECK SELECCIONADO AL CLICKAR EN BUSCAR MUESTRO EL MENSAJE DE ERROR     
    if ( !(this.formBusqueda.get("ChkNombreTipoRecurso").value)  &&  (modo==="inicial")  ) {
      this.sinOpcionesSeleccionadas=true;
      return false;
    } else {
      this.sinOpcionesSeleccionadas=false;
      //SI ESTA CHEQUEADO BUSCAR POR TITULO, AGREGO LA VALIDACION NECESARIA Y LO
      // MARCO COMO TOUCHED PARA QUE EJECUTE LA VALIDACION Y MUESTRE EL MENSAJE SI NO CUMPLE LA VALIDACION
      if ((this.formBusqueda.get("ChkNombreTipoRecurso").value)){                          
          var validaciones = [Validators.required];                     
           this.formBusqueda.get('NombreTipoRecurso').setValidators(validaciones);
           this.formBusqueda.get('NombreTipoRecurso').updateValueAndValidity(); 
           this.formBusqueda.get('NombreTipoRecurso').markAsTouched(); 
          if (!this.formBusqueda.valid){
           return false;
          } else {
            //SI EL FORMULARIO ES VALIDO SETEO EL OBJETO PARA ENVIAR AL BACKEND PARA BUSCAR
            if (this.formBusqueda.get("ChkNombreTipoRecurso").value) { this.tipoRecursoBuscar.OpcionBusquedaUno="pornombretipo",this.tipoRecursoBuscar.NombreTipoRecurso=this.formBusqueda.get("NombreTipoRecurso").value;this.tipoRecursoBuscar.page=pagina } 
          }        
      } else { this.tipoRecursoBuscar.OpcionBusquedaUno="";this.tipoRecursoBuscar.NombreTipoRecurso="";this.tipoRecursoBuscar.page=pagina }


      

 }//SI SELECCIONO ALGUN CHECK

    
  if (modo==="cancel") {
    //CUANDO CLICKEO EN CANCELAR TAMBIEN LLAMO A ESTE METODO BUSCAR, PERO ADEMAS RESETEO EL FORMULARIO
    this.formBusqueda.reset();
  }       
    this.previousPage = 1;                    
    $("#cargandoTabla").show();    
    
  return this._tiporecursoservice.buscar(this.tipoRecursoBuscar).subscribe(     
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
          this.tiposrecursos = respuesta.data;          
          this.totalItems =respuesta.total;            
          this.showPagination = true;          
        }

        $("#cargandoTabla").hide();

       this.tiposrecursos=JSON.parse(JSON.stringify(respuesta.data));                         
        },
    (error) => {

        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );                       
  }        

  
  constructor(private _tiporecursoservice:TiposRecursosService,private config: NgbPaginationConfig,private _builder:FormBuilder,private _apiTiposRecursos:TiposRecursosService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.config.boundaryLinks = true;
    //CREO EL FORMULARIO VACIO DE VALIDACIONES, YA QUE LAS AGREGO A MEDIDA QUE SE CLICKEA EN EL CHECK CORRESPONDIENTE 
    //PARA VALIDAR POR EJEMPLO: SI ESTA CHEQUEADO EL CH1 NO VALIDAR EL INPUT DEL OTRO CHECK YA QUE UNO SOLO ES OBLIGATORIO
    this.formBusqueda = this._builder.group({
      NombreTipoRecurso: [''],      
      ChkNombreTipoRecurso: [false],     
  });
}  


   loadPage(page: number) { 
     //ESTE METODO ES LLAMADO CADA VEZ QIE SE HACE CLICK EN UNA PAGINA   
      this.previousPage = page;     
      this.buscar(this.page-1,"");    
  }
  

  deleteConfirmacion(){   
    return this._tiporecursoservice.delete(this.idTipoRecursoAEliminar).subscribe(
      (respuestad) => {
        if (respuestad.success==true){
         // alert("elimino"+this.idRecursoAEliminar);
         //alert(JSON.stringify(this.recursos[3]));
          //SI SE ELIMINO CORRECTAMENTE LO BORRO DEL ARRAY ASI SE REFLEJA EN LA VISTA
          this.tiposrecursos= this.tiposrecursos.filter(re => re.IdTipoRecurso !== this.idTipoRecursoAEliminar);      
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
    this.idTipoRecursoAEliminar=idRecurso;
    //GUARDO EL ID QUE SE ELIMINARA PARA LUEGO OBTENERLO DESDE LA FUNCION
    // A LA QUE LLAMA EL MODAL
    $('#modal-eliminar').modal();     
  }
 
 
 
 
 
 
 
 
 
 
 
 
  cambiarEstado(idTipoRecurso){ 
    //alert(idTipoRecurso);
    this.idTipoRecursoACambiarEstado=idTipoRecurso;    
    $('#modal-cambiar-estado').modal();     
  }
  cambiarEstadoConfirmacion(){   
    return this._tiporecursoservice.cambiarDeEstado(this.idTipoRecursoACambiarEstado).subscribe(
      (respuestad) => {
        if (respuestad.success==true){
          var idamodificar=this.idTipoRecursoACambiarEstado;
          this.tiposrecursos.forEach(function (dato, index, array) {            
            if(dato.IdTipoRecurso == idamodificar){              
              dato.Activo = !dato.Activo;
            }
         },idamodificar);
          this.tiposrecursos.forEach(function (dato,idTipoRecursoACambiarEstado) { // recorremos el array
            if(dato.IdTipoRecurso == idTipoRecursoACambiarEstado){
              //alert("entr");
              dato.Activo = !dato.Activo;
            }
         });


             
        }        
        },
    (error) => {   
      alert(JSON.stringify(error));  
        },
        () => {         
          $('#modal-cambiar-estado').modal('hide');
            }             
    );
  
  }

  



  cancelarBusqueda(modo){
    this.page =1;
    this.previousPage =1;
    $("#cargandoTabla").show();   
    this.tipoRecursoBuscar={IdTipoRecurso:0,NombreTipoRecurso:""}; 
    this.formBusqueda.reset();
    this.buscar(this.page-1,modo);//LE PASO LA PAGINA MENOS 1 PARA LUEGO TOMAR LOS ITEMS         
  }
  ngOnInit(): void {
    $('body').toggleClass("sidebar-open");
    //LA PAGINACION COMIENZA EN LA PAGINA 1
    this.page =1;
    this.previousPage =1;
    $("#cargandoTabla").show();


    this.tipoRecursoBuscar.OpcionBusquedaUno="";
    this.tipoRecursoBuscar.NombreTipoRecurso="";

    this.buscar(this.page-1,"");//LE PASO LA PAGINA MENOS 1 PARA LUEGO TOMAR LOS ITEMS 
    //OSEA, PAGINA 1 TRAERIA LOS PRIMEROS 10
    
  }


  generarPdf(){
      var body = [];
      var titulos = new Array( 'Id', 'Nombre', 'Estado' );
      body.push( titulos );            
      var x:any;
      for (x of this.tiposrecursos) {  
          var fila = new Array();
          fila.push( x.IdTipoRecurso );
          fila.push( x.NombreTipoRecurso );
          fila.push( x.Activo );          
          body.push(fila);
      } 
  //console.log( body );
  var docDefinition = {
    header: 'Listado de tipos de recursos',
  footer: {
    columns: [      
      { text: 'Listado de tipos de recursos', alignment: 'right' }
    ]
  },
      content: [
      {
          table: {
             headerRows: 1,
             widths: [ 100, '*', 100 ],
             body: body,
          }
      }]
  };
  pdfMake.createPdf(docDefinition).open();      
  }
}

