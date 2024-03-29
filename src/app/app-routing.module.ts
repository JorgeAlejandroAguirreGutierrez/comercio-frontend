import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeerProductoComponent } from './producto/leer-producto/leer-producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './principal/principal.component';
import { ResumenPedidoComponent } from './pedido/resumen-pedido/resumen-pedido.component';
import { LeerPedidoComponent } from './pedido/leer-pedido/leer-pedido.component';
import { LeerPedidoClienteComponent } from './pedido/leer-pedido-cliente/leer-pedido-cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DetallarProductoComponent } from './producto/detallar-producto/detallar-producto.component';

const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: PrincipalComponent},
  { path: 'categoria', component: CategoriaComponent},
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'leer-producto', component: LeerProductoComponent},
  { path: 'crear-producto', component: CrearProductoComponent},
  { path: 'detallar-producto', component: DetallarProductoComponent},
  { path: 'resumen-pedido', component: ResumenPedidoComponent},
  { path: 'leer-pedido', component: LeerPedidoComponent},
  { path: 'leer-pedido-cliente', component: LeerPedidoClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
