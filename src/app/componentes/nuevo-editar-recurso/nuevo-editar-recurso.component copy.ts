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
  form: FormGroup;

  tiposrecursos:any=[];

  public untipo:TipoRecurso;


  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'}
  ];

  public Editor = ClassicEditor; 
     
  constructor(private _recursoservice:RecursosService,private route: ActivatedRoute,
    private router: Router,private _builder:FormBuilder,private _apiTiposRecursos:TiposRecursosService) {

      this.form= this._builder.group({     
        Titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
        detalle_recurso: ['', Validators.required],
        categoria: ['', [Validators.required]]    
      });   

     
      
      
      if (typeof this.route.snapshot.params['IdRecurso'] !== 'undefined') {


      //  alert("definido");
        this.obtenerUnRecursos(this.route.snapshot.params['IdRecurso']);
        this.cargarSelect();
      
      } else {

        

        //this.unrecurso.tiporecurso=this.untipo;

       
        
        this.cargarSelect();
        
        //this.No

        
       
       
      }
     
     
      
     }      
  obtenerUnRecursos(idRecurso){             
    return this. _recursoservice.getRecursosPorIdRecurso(idRecurso).subscribe(
      (respuesta) => {       
       this.recursos=JSON.parse(JSON.stringify(respuesta));
       this.unrecurso=JSON.parse(JSON.stringify(this.recursos[0]));
       console.log(JSON.stringify( this.unrecurso));      
        },
    (error) => {
     // console.log(JSON.stringify(error));
        },
        () => {          
          this.unrecurso.tiporecurso=this.tiposrecursos.find(x => x.IdTipoRecurso == this.unrecurso.tiporecurso.IdTipoRecurso);
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  }





  


  compartir(event:Event){ 

    if (this.form.valid) {
      if (sessionStorage.getItem('usuarioAdminLogeado') !== null ) {
        return this._recursoservice.enviarRecurso(this.unrecurso).subscribe(
          (respuesta) => { 
            alert(JSON.stringify(respuesta));         
            //this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));  
            //console.log(this.tiposrecursos);                                 
            },
      (error) => {
        alert(error);
        console.log("errrr"+JSON.stringify(error));} 
        ,() => { });
      }
  }
  else {
    this.form.markAllAsTouched();
  }

  }


  cargarSelect(){             
    return this._apiTiposRecursos.getAll().subscribe(
      (respuesta) => {  
      //  alert(JSON.stringify(respuesta));    
        this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));  


 
        //console.log(this.tiposrecursos);                                 
        },
    (error) => {
      alert(error);
      console.log("errrr"+JSON.stringify(error));      
        } ,
        () => {     
          
          
        this.untipo = {IdTipoRecurso:1,NombreTipoRecurso:"Herramientas",Descripcion:"Herramientas para programar",Imagen:"php.png",Color:"y-border",Cantidad:31,Activo:true};
        //this.untipo.IdTipoRecurso=6;
         //this.untipo.NombreTipoRecurso="php";
         var obj = { idRecurso: 0,NombreRecurso:"",Titulo:"",tiporecurso:this.untipo};
 
        // this.unrecurso=new Object();
 
         this.unrecurso=obj;
            }
    );
  }



  ngOnInit(): void {    
//alert(this.route.snapshot.params['IdRecurso']);



   


   

  //  $('.js-example-basic-single').select2();

  }

}
