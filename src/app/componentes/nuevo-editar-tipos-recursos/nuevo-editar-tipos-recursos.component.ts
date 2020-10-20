import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso-interface';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TiposRecursosService } from 'src/app/servicios/tipos-recursos/tipos-recursos.service';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';
import { Archivo } from 'src/app/models/archivo-interface';
import { ArchivosService } from 'src/app/servicios/archivos/archivos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nuevo-editar-tipos-recursos',
  templateUrl: './nuevo-editar-tipos-recursos.component.html',
  styleUrls: ['./nuevo-editar-tipos-recursos.component.css']
})
export class NuevoEditarTiposRecursosComponent implements OnInit { 
  
  
//@ViewChild('eventForm') public eventListingForm:NgForm;

 public gaurde:boolean;// POR ESTA VARIABLE PREGUNTO EN EL GUARD CANDEACTIVATE, SI GUARDE DEJA PASAR, Y NO PREGUNTA SI DESOE SALIR



  untiporecurso:TipoRecurso;
   form: FormGroup;
  AccionEntidad:String;
  tiposrecursos:TipoRecurso={IdTipoRecurso:0,NombreTipoRecurso:""};  
  editando:Boolean;

  public archivo: Archivo;//EN ESTA CLASE ALMACENO TEMPORALMENTE LA IMAGEN CON UN ID Y DESCRIPCION PARA LUEGO ENVIAR SU CONTENIDO EN EL GUARDAR
 
  public laimagen:any;  
  public errorEnImagen=false;//MUESTRA UN MENSAJE DE ERROR SI NO ESTA CARGADO BIEN LA IMAGEN, TAMAÑO 

     
  constructor(private route: ActivatedRoute,
    private router: Router,private _builder:FormBuilder,private _tiposRecursos:TiposRecursosService,private _archivos:ArchivosService,private sanitizer:DomSanitizer) {
      //CREO EL FORMULARIO CON SUS VALIDACIONES
      this.form= this._builder.group({     
        NombreTipoRecurso: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-ñÑ:_()?¿ ]+$/)]],               
      });
      
      
     

     }      
  obtenerUnTipoRecurso(idTipoRecurso:number){             
    return this. _tiposRecursos.getTipoRecursoPorIdTipoRecurso(idTipoRecurso).subscribe(
      (respuesta) => {      
       this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));
       this.untiporecurso=JSON.parse(JSON.stringify(this.tiposrecursos[0])); 
       this.laimagen=this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + this.untiporecurso.ImagenBase64);//LA IMAGEN GUARDADA EN LA BD LA CONVIERTO EN IMAGEN       
       this.form.patchValue(this.untiporecurso); 
                                           
      },
    (error) => {     
        },
        () => {                               
            }             
    );
  }

    
  guardar(event:Event){ 
    this.gaurde=true;    
    //PARA TOMAR EL ANCHO Y ALTO PUDE HACERLO USANDO UN HIDDEN
    var formElement = <HTMLFormElement>document.getElementById('errorEnImagen');
    if (formElement.value=="true"){
      this.errorEnImagen=true;
      return false;
    }      
    //console.log(this.form.errors);
    if (this.form.valid) {
      if (sessionStorage.getItem('usuarioAdminLogeado') !== null ) {              
        this.untiporecurso.NombreTipoRecurso=this.form.get('NombreTipoRecurso').value;
        this.untiporecurso.ImagenBase64=this.archivo.Imagen;                
        return this._tiposRecursos.enviarTipoRecurso(this.untiporecurso).subscribe(
          (respuesta) => { 
            this.router.navigate(['/listados-tipos-recursos']);  
          //FALTA ACA UN MENSAJE, TOAST O MODAL DE QUE SE GUARDO CORRECTAMENTE                                          
          },
      (error) => {
        alert(error);
        console.log("errrr"+JSON.stringify(error));      
          } ,
          () => {         
              }  
      );
    }
    else {
      alert("Debe loguearse");//PONER UN TOAST ACÁ
    }

  }
  else {
    //SI CLICKEO EN COMPOARTIR Y EL FORMULARIO ES INVALIDO, SETEO TODOS LOS CAMPOS COMO "TOCADOS" Y DE ESA MANERA 
    //APARECERAN LOS  ERRORES DE VALIDACION
    this.form.markAllAsTouched();
  }

  
}


//------------------------------------------------subir imagen----------------------------------------------------
fileEvent(event) {
  this.archivo={ Id: 0}; 
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];   
    if ( (file.type!="image/jpeg") && (file.type!="image/png")   )    {
      this.errorEnImagen=true;      
      return false;
    }
    

    if ( (file.type!="image/jpeg") && (file.type!="image/png")   )    {
      this.errorEnImagen=true;      
      return false;
    }
   
    reader.readAsDataURL(file);
    reader.onload = () => {               
      this.laimagen="data:image/png;base64,"+reader.result.toString().split(',')[1]; 
      //var imgData = "data:image/png;base64,"+reader.result.toString().split(',')[1];   
      var img = new Image();             
      img.addEventListener('load',
    function(){
      var formElement = <HTMLFormElement>document.getElementById('errorEnImagen');       
      if (( img.width !== 590) || ( img.height !== 340) )    {  
        formElement.value="true";               
      } else {
        formElement.value="false";
      }
     }    
    ,false);

    img.src = this.laimagen;    
    this.archivo.Imagen=reader.result.toString().split(',')[1];            
    };


  }
}

//------------------------------------------------fin subir imagen----------------------------------------------------


  


  ngOnInit(): void {    
    this.gaurde=false;
   
    
    if (typeof this.route.snapshot.params['IdTipoRecurso'] !== 'undefined') {
      //CONFIGURO ESTA VARIABLE PARA SABER SI ESTOY EDITANDO O NO
      this.editando=true;      
      //SI  RECIBO UN IDE DE LA ENTIDAD, EN ESTE CASO RECURSO, LO BUSCO EN LA BD Y LO CARGO EN EL FORMULARIO
      //SINO CREO UN OBJETO CON ID EN 0 PARA LUEGO, SI ES 0 INSERTO, SI ES <> DE 0 ACTUALIZO
      this.obtenerUnTipoRecurso(this.route.snapshot.params['IdTipoRecurso']);
      this.AccionEntidad="Editar Tipo Recurso";
    }  else {
      this.editando=false;
      this.AccionEntidad="Nuevo Tipo Recurso";
      this.untiporecurso = { IdTipoRecurso: 0,NombreTipoRecurso:"",Descripcion:"-",Imagen:"1",Activo:true,Color:"-",Cantidad:0};           
    }    
   
  }

}

