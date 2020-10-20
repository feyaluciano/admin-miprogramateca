import { Component, OnInit } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';
import { Recurso } from 'src/app/models/recurso-interface';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-listado-recursos',
  templateUrl: './listado-recursos.component.html',
  styleUrls: ['./listado-recursos.component.css']
})
export class ListadoRecursosComponent implements OnInit {
  recursos: Recurso[];
  idRecursoAEliminar:number; 
  
  totalItems:number;
  page: number;
  previousPage: number;
  showPagination: boolean;
  sinOpcionesSeleccionadas:boolean=false;


  recursoBuscar:Recurso={IdRecurso:0};
  
  formBusqueda: FormGroup;

  obtenerRecursos(page){   
    $("#cargandoTabla").show();         
  return this._recursoservice.getRecursosPaginado(page).subscribe(     
      (respuesta) => {
        $("#cargandoTabla").hide();
       //alert(JSON.stringify(respuesta));
       this.recursos=JSON.parse(JSON.stringify(respuesta.data));      
       
       //MI PAGINACION SERA DE 10, POR LO TANTO SI HAY MENOS DE 10 RESULTADOS NO MUESTRO LA PAGINACION
       //respuesta.total CADA VEZ QUE VOY BUSCAR LOS ELEMENTOS, TAMBIEN TRAIGO EN ESE CAMPO, TOTAL, LA CANTIDAD TOTAL DE ELEMENTOS
       // PARA LA CONFIGURACION DEL PAGINADO
       if ((!respuesta && !respuesta.data) || (respuesta && respuesta.data && respuesta.data.length < 10)) {               
			  this.showPagination = false;
			}
			else {
			  this.recursos = respuesta.data;
			  this.totalItems = this.totalItems=respuesta.total;
			  this.showPagination = true;
			}
      
        },
    (error) => {
     // console.log(JSON.stringify(error));
        },
        () => {
          
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  }        
  


//https://blog.maestriajs.com/blog/ionic2/validations/
//https://jasonwatmore.com/post/2020/04/19/angular-9-reactive-forms-validation-example
//https://medium.com/@azaharafernandezguizan/c%C3%B3mo-paginar-y-ordenar-una-tabla-en-angular-f%C3%A1cilmente-ba11ccb15214

  buscar(pagina,modo){
    //VALIDACIONES DINAMICAS     
    if ( !(this.formBusqueda.get("ChkTitulo").value) && !(this.formBusqueda.get("ChkTipoRecurso").value) &&  (modo==="inicial")  ) {
      this.sinOpcionesSeleccionadas=true;
      return false;
    } else {
      this.sinOpcionesSeleccionadas=false;
      if ((this.formBusqueda.get("ChkTitulo").value)){                          
          var validaciones = [Validators.required];                     
           this.formBusqueda.get('Titulo').setValidators(validaciones);
           this.formBusqueda.get('Titulo').updateValueAndValidity(); 
           this.formBusqueda.get('Titulo').markAsTouched(); 
          if (!this.formBusqueda.valid){
           return false;
          } else {
            if (this.formBusqueda.get("ChkTitulo").value) { this.recursoBuscar.OpcionBusquedaUno="portitulo";this.recursoBuscar.Titulo=this.formBusqueda.get("Titulo").value; } 
          }        
      } else { this.recursoBuscar.OpcionBusquedaUno="";this.recursoBuscar.Titulo=""; }


      if ((this.formBusqueda.get("ChkTipoRecurso").value)){ 
        //alert();                         
        var validaciones = [Validators.required];                     
         this.formBusqueda.get('tiporecurso').setValidators(validaciones);
         this.formBusqueda.get('tiporecurso').updateValueAndValidity();
         this.formBusqueda.get('tiporecurso').markAsTouched(); 
        if (!this.formBusqueda.valid){
         return false;
        } else {
          if (this.formBusqueda.get("ChkTipoRecurso").value) { this.recursoBuscar.OpcionBusquedaDos="portipor";this.recursoBuscar.IdTipoRecurso=this.formBusqueda.get("tiporecurso").value; } 
        }        
    } else {  this.recursoBuscar.OpcionBusquedaDos="";this.recursoBuscar.IdTipoRecurso=0; }











    }

    //alert(modo);
    //alert("es valido"+this.formBusqueda.valid);
    //alert("too"+this.formBusqueda.valid);
    
  
  if (modo==="cancel") {
    this.formBusqueda.reset();
  }



   
    $("#cargandoTabla").show();    
    this.previousPage = 1;            
    this.recursoBuscar.page=pagina;

  
  
  var buscarTitulo="";
  //if (recursoBuscar.OpcionBusquedaUno!=""){
    //buscarTitulo=this.formBusqueda.get("Titulo").value;
    //alert(buscarTitulo);
  //}
  
  //this.recursoBuscar = { IdRecurso:0,Titulo:buscarTitulo,OpcionBusquedaUno:recursoBuscar.OpcionBusquedaUno,page:page}; 


//alert(JSON.stringify(this.recursoBuscar));
  //alert("pagina a bus"+this.recursoBuscar.page);    
  return this._recursoservice.buscar(this.recursoBuscar).subscribe(     
      (respuesta) => {
//alert("total"+respuesta.total);

//alert("seg"+respuesta + respuesta.data + (respuesta.data.length < 5));

//alert("priemr"+ (!respuesta) + (!respuesta.data));
//alert(respuesta.data.length+"lee"+respuesta+"resdata"+respuesta.data);
//alert(respuesta.total);
if (   respuesta.total <= 10)  { 
      //  if (  (!respuesta.success && !respuesta.data) ||  (respuesta.success  && respuesta.data.length < 5)  ) { 
              
          //alert("no mostrar"+(!respuesta.success && !respuesta.data)+(respuesta && respuesta.data && respuesta.data.length < 10));      
          this.showPagination = false;
        }
        else {
          //alert("si mostrar"+respuesta.data.length);   
          if (modo=="inicial") {
            this.page=1;
          }
          //alert("si mostrar");
          this.recursos = respuesta.data;
         // if (respuesta.total<((respuesta.total*2)-1)){
          //  alert("entr");
          //  this.totalItems =(respuesta.total*2)-1;
         // }  else {




          //if (( respuesta.data.length > 6  )  && (respuesta.data.length<=(6*2))   ) {
            //this.totalItems =(respuesta.data.length*2)-1;
          //}
          //else {
            this.totalItems =respuesta.total;
          //}
            

        //  }
            this.showPagination = true;
          
        }








        $("#cargandoTabla").hide();
       //alert(JSON.stringify(respuesta));
       this.recursos=JSON.parse(JSON.stringify(respuesta.data));                         
        },
    (error) => {
     // console.log(JSON.stringify(error));
        },
        () => {
          
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
         
  
  
  
  
  
  
  
  }        







  
  constructor(private _recursoservice:RecursosService,private config: NgbPaginationConfig,private _builder:FormBuilder) {
    this.config.boundaryLinks = true;


//,Validators.required
    this.formBusqueda = this._builder.group({
      Titulo: [''],      
      ChkTitulo: [false],
      ChkTipoRecurso: [false],
      tiporecurso: [''] 
  });



  /*this.formBusqueda.get('ChkTipoRecurso')
  .valueChanges
  .subscribe(value => {
    var sinvalidaciones = [];
    var validaciones = [Validators.required];
    if (value === true) {
      //alert("entro");
     // const validators = [Validators.required, Validators.maxLength(7)];
     this.formBusqueda.get('tiporecurso').setValidators(validaciones);
    // this.formBusqueda.get('tiporecurso').updateValueAndValidity();
      this.formBusqueda.get('Titulo').clearValidators;
      //this.formBusqueda.get('Titulo').updateValueAndValidity();    
    }    
    else {
//alert("sin");
      this.formBusqueda.get('tiporecurso').clearValidators;
     // this.formBusqueda.get('tiporecurso').updateValueAndValidity();
      this.formBusqueda.get('Titulo').setValidators(validaciones);
      //this.formBusqueda.get('Titulo').updateValueAndValidity();   

    }

    this.formBusqueda.updateValueAndValidity();
  });*/


  /*this.formBusqueda.get('ChkTitulo')
  .valueChanges
  .subscribe(value => {
    var sinvalidaciones = [];
    var validaciones = [Validators.required];
    if (value === true) {
      //alert("ponerrr v");
     // alert("poner vall"+value);
     // const validators = [Validators.required, Validators.maxLength(7)];
      
      this.formBusqueda.get('tiporecurso').clearValidators;
      this.formBusqueda.get('tiporecurso').updateValueAndValidity();
      this.formBusqueda.get('Titulo').setValidators(validaciones);
      this.formBusqueda.get('Titulo').updateValueAndValidity();
    } 
    else {
      this.formBusqueda.get('tiporecurso').setValidators(validaciones);
      //this.formBusqueda.get('tiporecurso').updateValueAndValidity();
      this.formBusqueda.get('Titulo').clearValidators;
      //this.formBusqueda.get('Titulo').updateValueAndValidity();

    }   
    //this.formBusqueda.updateValueAndValidity();
  });*/




    /*this.formBusqueda= this._builder.group({     
      Titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-:_()?¿ ]+$/)]],
      ChkTitulo: [false, Validators.requiredTrue]          
    });   */ 


   }  


   loadPage(page: number) {
    //if (page !== this.previousPage) {
      this.previousPage = page;     
      this.buscar(this.page-1,"");
    //}
  }




  deleteConfirmacion(){
    return this._recursoservice.delete(this.idRecursoAEliminar).subscribe(
      (respuestad) => {
        if (respuestad.success==true){
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
   // this.recursoBuscar = { IdRecurso:0,Titulo:"",OpcionBusquedaUno:"",page:1}; 
   this.recursoBuscar.OpcionBusquedaUno="";
this.recursoBuscar.Titulo="";
this.recursoBuscar.page=1;

this.recursoBuscar.OpcionBusquedaUno="";
this.recursoBuscar.OpcionBusquedaDos="";
this.formBusqueda.get("Titulo").setValue("");
this.formBusqueda.get("ChkTitulo").setValue(false);
this.formBusqueda.get("ChkTipoRecurso").setValue(false);

this.formBusqueda.markAsUntouched;

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

  }

}
