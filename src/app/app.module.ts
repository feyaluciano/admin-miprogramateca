import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component, OnInit } from '@angular/core';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppComponent }  from './componentes/app/app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule,Routes} from '@angular/router';
import { PanelComponent } from './componentes/panel/panel.component';
import { HeaderComponent } from './componentes/header/header.component';
import { MenuIzquierdoComponent } from './componentes/menu-izquierdo/menu-izquierdo.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ListadoRecursosComponent } from './componentes/listado-recursos/listado-recursos.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import { UsuariosService }  from './servicios/usuariosadmin/usuarios.service';
import { NuevoEditarRecursoComponent } from './componentes/nuevo-editar-recurso/nuevo-editar-recurso.component';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { NgSelectModule } from '@ng-select/ng-select';
import { ListadoTiposRecursosComponent } from './componentes/listado-tipos-recursos/listado-tipos-recursos.component';
import { NuevoEditarTiposRecursosComponent } from './componentes/nuevo-editar-tipos-recursos/nuevo-editar-tipos-recursos.component';
import { ABase64Pipe } from './pipes/a-base-64.pipe';
import { CanActivateGuardService } from './servicios/usuariosadmin/can-activate-guard.service';
import { CanDeActivateGuardService } from './servicios/usuariosadmin/can-deactivate-guard.service';
import { AuthInterceptorService } from './servicios/usuariosadmin/envia-token-interceptor.service';
import { PantallaBloqueoComponent } from './componentes/pantalla-bloqueo/pantalla-bloqueo.component';


const rutas:Routes=[  
  {
  path:'',
  component:AppComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'reingresar',
  component:PantallaBloqueoComponent
},
{
  path:'listado-recursos',
  component:ListadoRecursosComponent,
  canActivate: [CanActivateGuardService]
},
{
  path:'listados-tipos-recursos',
  component:ListadoTiposRecursosComponent,
  canActivate: [CanActivateGuardService]
},
{
  path:'tiporecurso/nuevo',
  component:NuevoEditarTiposRecursosComponent,
  canActivate: [CanActivateGuardService],
  canDeactivate: [CanDeActivateGuardService]
},
{
  path:'tiporecurso/editar/:IdTipoRecurso',
  component:NuevoEditarTiposRecursosComponent,
  canActivate: [CanActivateGuardService],
  canDeactivate: [CanDeActivateGuardService]
},

{
  path:'panel',
  component:PanelComponent,
  canActivate: [CanActivateGuardService]
},
 {
  path:'recurso/editar/:IdRecurso',
  component:NuevoEditarRecursoComponent,
  canActivate: [CanActivateGuardService]
},
{
  path:'recurso/nuevo',
  component:NuevoEditarRecursoComponent,
  canActivate: [CanActivateGuardService]
},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelComponent,
    HeaderComponent,
    MenuIzquierdoComponent,
    FooterComponent,
    ListadoRecursosComponent,
    NuevoEditarRecursoComponent,
    ListadoTiposRecursosComponent,
    NuevoEditarTiposRecursosComponent,
    ABase64Pipe,
    PantallaBloqueoComponent,
   
    
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  
    CKEditorModule,
    NgbModule,
    RouterModule.forRoot(rutas,{ useHash: true ,onSameUrlNavigation: "reload"}),  
          
  ],
  providers: [ UsuariosService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
