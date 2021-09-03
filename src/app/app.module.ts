import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeerProductoComponent } from './producto/leer-producto/leer-producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { ResumenPedidoComponent } from './pedido/resumen-pedido/resumen-pedido.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from './servicios/pedido.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LeerPedidoComponent } from './pedido/leer-pedido/leer-pedido.component';
import { LeerPedidoClienteComponent } from './pedido/leer-pedido-cliente/leer-pedido-cliente.component';
import { DateShortPipe } from './pipes/date-short-pipe';
import { CategoriaComponent } from './categoria/categoria.component';
import { DetallarProductoComponent } from './producto/detallar-producto/detallar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    InicioSesionComponent,
    LeerProductoComponent,
    CrearProductoComponent,
    ResumenPedidoComponent,
    LeerPedidoComponent,
    LeerPedidoClienteComponent,
    DateShortPipe,
    CategoriaComponent,
    DetallarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [PedidoService, {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
