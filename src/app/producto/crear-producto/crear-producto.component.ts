import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/modelos/color';
import { Parametro } from 'src/app/modelos/parametro';
import { Producto } from 'src/app/modelos/producto';
import { Talla } from 'src/app/modelos/talla';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  producto: Producto=new Producto();
  tallaForm: string="";
  colorForm: string="";
  color: string="";
  imagen: any= null as any;

  categorias: Parametro[]=[];
  tallas: Parametro[]=[];
  colores: Parametro[]=[];
  estilos: Parametro[]=[];

  constructor(private productoService : ProductoService, private parametroService: ParametroService,
    private sesionService: SesionService,
    private router: Router ) { }

  ngOnInit(): void {
    this.validarSesion();
    this.consultarCategorias();
    this.consultarEstilos();
    this.consultarTallas();
    this.consultarColores();
  }

  consultarCategorias(){
    this.parametroService.consultarPorTipo(constantes.parametroCategoria).subscribe(
      res => {
        this.categorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  consultarEstilos(){
    this.parametroService.consultarPorTipo(constantes.parametroEstilo).subscribe(
      res => {
        this.estilos = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_estilos, constantes.error_swal)
      }
    );
  }

  consultarTallas(){
    this.parametroService.consultarPorTipo(constantes.parametroTalla).subscribe(
      res => {
        this.tallas = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_tallas, constantes.error_swal)
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

  validarSesion(){
    let usuarioActivo=this.sesionService.adminLogueado();
    if(!usuarioActivo){
      this.navegarIndex();
    }
  }

  crear(){
    console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
          if(this.imagen!=null){
            this.crearImagen(res.id);
          }
          this.navegarLeerProducto();
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_producto, constantes.error_swal)
      }
    );
  }

  crearTalla(){
    for(let i=0; i<this.producto.tallas.length; i++){
      if (this.tallaForm==this.producto.tallas[i].descripcion){
        Swal.fire(constantes.error, constantes.error_talla_existente, constantes.error_swal);
        return;
      }
    }
    let talla: Talla=new Talla();
    talla.descripcion=this.tallaForm;
    this.producto.tallas.push(talla);
  }

  eliminarTalla(i: number){
    this.producto.tallas.splice(i, 1);
  }

  crearColor(){
    for(let i=0; i<this.producto.colores.length; i++){
      if (this.colorForm==this.producto.colores[i].descripcion){
        Swal.fire(constantes.error, constantes.error_color_existente, constantes.error_swal);
        return;
      }
    }
    let color: Color=new Color();
    color.descripcion=this.colorForm;
    this.producto.colores.push(color);
  }

  eliminarColor(i: number){
    this.producto.colores.splice(i, 1);
  }

  cargarImagen(event: any){
    let imagenes: FileList=event.target.files;
    this.imagen=imagenes.item(0);
  }

  crearImagen(id: number){
    this.productoService.crearImagen(this.imagen, id).subscribe(
      res => {
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_imagen, constantes.error_swal)
      }
    );
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
