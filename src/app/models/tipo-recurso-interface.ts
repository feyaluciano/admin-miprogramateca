import { Archivo } from './archivo-interface';

export interface TipoRecurso {
    IdTipoRecurso:Number;
    NombreTipoRecurso:String;
    Descripcion?:String;
    Imagen?:String;
    ImagenBase64?:String;
    Color?:String;
    Cantidad?:Number;
    Activo?:Boolean;
    OpcionBusquedaUno?:String;    
    page?:number;
}