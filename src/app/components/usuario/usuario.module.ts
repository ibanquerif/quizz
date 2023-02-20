import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '../shared/shared.module';

// componentes
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    VerificarCorreoComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
