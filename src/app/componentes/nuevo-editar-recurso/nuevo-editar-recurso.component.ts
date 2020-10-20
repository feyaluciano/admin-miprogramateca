import { Component, OnInit } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos/recursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso-interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TiposRecursosService } from 'src/app/servicios/tipos-recursos/tipos-recursos.service';
import { TipoRecurso } from 'src/app/models/tipo-recurso-interface';
@Component({
  selector: 'app-nuevo-editar-recurso',
  templateUrl: './nuevo-editar-recurso.component.html',
  styleUrls: ['./nuevo-editar-recurso.component.css']
})
export class NuevoEditarRecursoComponent implements OnInit {
  recursos: String[]; 
  unrecurso:Recurso;
  untiporecurso:TipoRecurso;
  form: FormGroup;
  AccionEntidad:String;
  tiposrecursos:any=[];  
  editando:Boolean;

  public Editor = ClassicEditor;      
  constructor(private _recursoservice:RecursosService,private route: ActivatedRoute,
    private router: Router,private _builder:FormBuilder,private _apiTiposRecursos:TiposRecursosService) {
      //CREO EL FORMULARIO CON SUS VALIDACIONES
      this.form= this._builder.group({     
        Titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-:_()?¿ ]+$/)]],
        CuerpoRecurso: ['', Validators.required],
        categoria: ['', [Validators.required]]    
      });    
     
     
      
     }      
  obtenerUnRecursos(idRecurso:number){             
    return this. _recursoservice.getRecursosPorIdRecurso(idRecurso).subscribe(
      (respuesta) => {      
       this.recursos=JSON.parse(JSON.stringify(respuesta));
       this.unrecurso=JSON.parse(JSON.stringify(this.recursos[0]));             
      
      
       this.form.patchValue(this.unrecurso);                     
       //this.form.get('Titulo').setValue(this.unrecurso.Titulo);
      // this.form.get('CuerpoRecurso').setValue(this.unrecurso.CuerpoRecurso); 
        
      
      
      
      },
    (error) => {     
        },
        () => { 
          //EN LA SIGUIENTE LINEA, OBTENGO EL TIPO DE RECURSO  QUE TIENE EL RECURSO YA SETEADO
          // EN LA BD, DE ESA MANERA QUEDA SELCCIONADO DICHO TIPO DE RECURSO            
       this.form.get('categoria').setValue(this.tiposrecursos.find(x => x.IdTipoRecurso == this.unrecurso.tiporecurso.IdTipoRecurso));                                   
            }             
    );
  }

    
  compartir(event:Event){ 
    //console.log(this.form.errors);
    if (this.form.valid) {
      if (sessionStorage.getItem('usuarioAdminLogeado') !== null ) {
       
       
        this.unrecurso.Titulo=this.form.get('Titulo').value;
        this.unrecurso.tiporecurso=this.form.get('categoria').value;
        this.unrecurso.CuerpoRecurso=this.form.get('CuerpoRecurso').value;        
        
        
        return this._recursoservice.enviarRecurso(this.unrecurso).subscribe(
          (respuesta) => { 
            this.router.navigate(['/listado-recursos']);  
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


  cargarSelect(){    
    //CARGO EL COMPO DE TIPO DE RECURSOS         
    return this._apiTiposRecursos.getAll().subscribe(
      (respuesta) => {      
        this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));  
       // alert(JSON.stringify(this.tiposrecursos[0]));                              
      if (this.editando==false){       
        this.form.get('categoria').setValue(this.tiposrecursos[0]); 
      }
        },
    (error) => {},
        () => {         
            });}



  ngOnInit(): void {     
    if (typeof this.route.snapshot.params['IdRecurso'] !== 'undefined') {
      //CONFIGURO ESTA VARIABLE PARA SABER SI ESTOY EDITANDO O NO
      this.editando=true;      
      //SI  RECIBO UN IDE DE LA ENTIDAD, EN ESTE CASO RECURSO, LO BUSCO EN LA BD Y LO CARGO EN EL FORMULARIO
      //SINO CREO UN OBJETO CON ID EN 0 PARA LUEGO, SI ES 0 INSERTO, SI ES <> DE 0 ACTUALIZO
      this.obtenerUnRecursos(this.route.snapshot.params['IdRecurso']);
      this.AccionEntidad="Editar Recurso";
    }  else {
      this.editando=false;
      this.AccionEntidad="Nuevo Recurso";
      this.unrecurso = { IdRecurso: 0,Titulo:"",Recomendado:false,IdUsuario:1,Activo:true,Oculto:false};           
    }    
    this.cargarSelect(); 
  }

}
