import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as constantes from '../constantes';
import { Parametro } from '../modelos/parametro';
import { ParametroService } from '../servicios/parametro.service';
import { ProductoService } from '../servicios/producto.service';
import { SesionService } from '../servicios/sesion.service';
import * as util from '../util';
import Swal from 'sweetalert2';
import { CategoriaService } from '../servicios/categoria.service';
import { Categoria } from '../modelos/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  tienda=environment.tienda;
  categorias: Categoria[]=[];
  
  constructor(private categoriaService: CategoriaService, private router: Router ) { }

  ngOnInit(): void {
    util.loadScripts();
    this.consultarCategorias();
  }

  consultarCategorias(){
    this.categoriaService.consultar().subscribe(
      res => {
        this.categorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

}
