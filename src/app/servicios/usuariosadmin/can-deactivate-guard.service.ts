import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
//IMPORTO EL COMPONENTE QUE DESEO PROTEGER, EN ESTE CASO QUE NO SALGA SIN GUARDAR.(NuevoEditarTiposRecursosComponent)
import { NuevoEditarTiposRecursosComponent } from '../../componentes/nuevo-editar-tipos-recursos/nuevo-editar-tipos-recursos.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeActivateGuardService implements CanDeactivate<NuevoEditarTiposRecursosComponent> {

  canDeactivate(target: NuevoEditarTiposRecursosComponent) {
    //SI EL FORMULARIO ESTA SUCIO, OSEA LO MODIFIQUE Y ESTOY SALIENDO PERO NO ESTOY GUADANDO (ESTO LO HAGO PORQUE AL GUARDAR , EN EL SUCCESS REDIRECCIONO, SALGO, CAMBIO
    // DE RUTEO, Y PREGUNTARIA SI ESTOY SEGURO DE SALIR, Y NO DEBERIA PREGUNTARLO PORQUE ESTOY SALIENDO XQ GUARDÉ)   
    if(target.form.dirty && target.gaurde==false){
        return window.confirm('Estas seguro de salir sin guardar los cambios?');
    }
    return true;
  }
}
