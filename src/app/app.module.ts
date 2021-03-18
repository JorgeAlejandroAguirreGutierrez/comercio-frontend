import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule} from '@angular/material/core';


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
    DateShortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule,
    MatAutocompleteModule, MatCardModule, MatExpansionModule, MatDividerModule, MatIconModule, MatStepperModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSortModule, MatPaginatorModule, MatToolbarModule,
    MatSidenavModule, MatMenuModule, MatListModule, MatGridListModule, MatBadgeModule, MatDialogModule, NgbModule,
  ],
  providers: [PedidoService, {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
