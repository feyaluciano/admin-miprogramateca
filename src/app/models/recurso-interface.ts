import { TipoRecurso } from './tipo-recurso-interface';

export interface Recurso {
    IdRecurso:Number;
    Titulo?:String;
        TituloUrl?:String;
        IdUsuario?:number;
		CuerpoRecurso?:String;		
		Recomendado?:Boolean;    
        Activo?:Boolean; 
        Oculto?:Boolean;
        IdTipoRecurso?:number;           
        tiporecurso?:TipoRecurso;        
        created_at?:Date;
        //USO EL MISMPO OBJETO COMO ENTIDAD Y PARA BUSCAR POR ESO LOS SIGUIENTES CAMPOS DE BUSQUEDA LOS PONGO COMO ATRIBUTO DEL OBJETO RECURSO
        //CADA UNO EQUIVALE A LA CONFIGURACION DE BUSQUEDA SELECCIONADA, POR EJ OpcionBusquedaUno SERÁ = 'portitulo' 
        //CUANDO SE BUSQUE POR TITULO, Y EL VALOR A BUSCAR ESTARA EN EL CAMPO TITULO DEL OBJETO
        OpcionBusquedaUno?:String;
        OpcionBusquedaDos?:String;
        page?:number;

}