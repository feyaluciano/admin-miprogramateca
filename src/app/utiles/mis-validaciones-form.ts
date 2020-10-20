import {AbstractControlDirective, AbstractControl} from '@angular/forms' 
import { UsuariosService } from 'src/app/servicios/usuariosadmin/usuarios.service';


export class MisValidacionesForm{        
    static noTieneMayuscula(control:AbstractControl){
        var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        const valor=control.value;
        var tiene=false;
         for(var i=0; i<valor.length; i++){
            if (letras_mayusculas.indexOf(valor.charAt(i),0)!=-1){
                tiene=true;
                break;
            }
         }        
         if (!tiene) {
            return {noTieneMayuscula:true}
        }
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }

    static noTieneMayusculaConParametro(cantidadMinimaDeMayusculas:number){
       return  (control:AbstractControl) =>{
           var tiene:Boolean;
        var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        const valor=control.value;
         var cantidad:number=0;
         for(var i=0; i<valor.length; i++){
            if (letras_mayusculas.indexOf(valor.charAt(i),0)!=-1){
                cantidad++;               
            }
         }          
         if (cantidad <cantidadMinimaDeMayusculas) {
            return {noTieneMayusculaConParametro:true}
         }                 
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }
}


static chequearEmail(_usuarioadminService:UsuariosService) {
    return (control: AbstractControl) => {
      const value = control.value;

      return _usuarioadminService.chequearUnEmail(value)
    }
        
}

   







    static isYounger(control:AbstractControl){
        const value=control.value;
        if (value < 18) {
            return {isYounger:true}
        }
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }


}