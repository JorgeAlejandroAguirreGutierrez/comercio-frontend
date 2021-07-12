import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/modelos/color';
import { Parametro } from 'src/app/modelos/parametro';
import { Presentacion } from 'src/app/modelos/presentacion';
import { Producto } from 'src/app/modelos/producto';
import { Sesion } from 'src/app/modelos/sesion';
import { Talla } from 'src/app/modelos/talla';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import * as util from '../../util';
import { environment } from '../../../environments/environment';
import { Categoria } from 'src/app/modelos/categoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Subcategoria } from 'src/app/modelos/subcategoria';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  tienda=environment.tienda;
  producto: Producto=new Producto();
  tallaForm: string= "";
  colorForm: string= "";
  color: string="";
  imagenes: any[]= [];

  categorias: Categoria[]=[];
  subcategorias: Subcategoria[]=[];
  tallas: Parametro[]=[];
  colores: Parametro[]=[];

  sesion: Sesion=null as any;
  

  constructor(private productoService : ProductoService, private parametroService: ParametroService,
    private categoriaService: CategoriaService, private sesionService: SesionService,
    private router: Router ) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarCategorias();
    this.consultarColores();
    
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

  consultarColores(){
    this.parametroService.consultarPorTipo(constantes.parametroColor).subscribe(
      res => {
        this.colores = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_colores, constantes.error_swal)
      }
    );
  }

  seleccionarCategoria(){
    this.producto.presentaciones=[];
    if (this.producto.categoria!=null){
      this.subcategorias=this.producto.categoria.subcategorias;
      this.parametroService.consultarPorTituloTipo(this.producto.categoria.descripcion ,constantes.parametroTalla).subscribe(
        res => {
          this.tallas = res;
          this.tallaForm = null as any;
        },
        err => {
          Swal.fire(constantes.error, constantes.error_consultar_tallas, constantes.error_swal)
        }
      );
    } else{
      this.subcategorias=[];
    }
  }

  validarSesion(){
    this.sesion=this.sesionService.getSesion();
    this.sesionService.validar(this.sesion.id).subscribe(
      res => {
        this.sesion=res;
      },
      err => {
        if(err.error.message==constantes.error_codigo_sesion_invalida){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
        if(err.error.message==constantes.error_codigo_modelo_no_existente){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
      }
    );
  }

  crear(){
    if (this.producto.precio==0){
      Swal.fire(constantes.error, constantes.error_precio_producto, constantes.error_swal);
    }
    if (this.producto.descuento==0){
      Swal.fire(constantes.error, constantes.error_descuento_producto, constantes.error_swal);
    }
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
          if(this.imagenes.length>0){
            this.crearImagen(res.id);
          }
          this.navegarLeerProducto();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_producto, constantes.error_swal)
      }
    );
  }

  crearPresentacion(){
    let talla: Talla=new Talla();
    talla.descripcion=this.tallaForm;
    let color: Color=new Color();
    color.descripcion=this.colorForm;
    let presentacion: Presentacion=new Presentacion();
    presentacion.talla=talla;
    presentacion.color=color;
    this.producto.presentaciones.push(presentacion);
  }

  eliminarPresentacion(i: number){
    this.producto.presentaciones.splice(i, 1);
  }

  cargarImagen(event: any){
    let imagenes: FileList=event.target.files;
    this.imagenes.push(imagenes.item(0));
  }

  crearImagen(id: number){
    for(let i=0; i<this.imagenes.length; i++){
      this.productoService.crearImagen(this.imagenes[i], id).subscribe(
        res => {
        },
        err => {
          Swal.fire(constantes.error, constantes.error_crear_imagen, constantes.error_swal)
        }
      );
    }
  }

  eliminarImagen(i: number){
    this.imagenes.splice(i, 1);
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  navegarLeerProducto() {
    this.router.navigate(['/leer-producto']);
  }

  cerrarSesion(event:any){
    if (event!=null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

}
