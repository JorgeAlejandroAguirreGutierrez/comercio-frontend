import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { Parametro } from 'src/app/modelos/parametro';
import { Sesion } from 'src/app/modelos/sesion';
import { Presentacion } from 'src/app/modelos/presentacion';
import { environment } from '../../../environments/environment';
import { Categoria } from 'src/app/modelos/categoria';
import { Subcategoria } from 'src/app/modelos/subcategoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.component.html',
  styleUrls: ['./leer-producto.component.css']
})
export class LeerProductoComponent implements OnInit {

  tienda=environment.tienda;
  productoActualizar: Producto = new Producto();
  presentacionForm: Presentacion = new Presentacion();

  imagen: any = null as any;
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  tallas: Parametro[] = [];
  colores: Parametro[] = [];

  //BUSCAR
  marca: string = "";
  categoria: Categoria = null as any;
  subcategoria: Subcategoria = null as any;

  sesion: Sesion=null as any;

  cerrarModal: string = "";

  @ViewChild('modalProductoActualizar', { static: false }) private modalProductoActualizar: any;
  @ViewChild('modalProductoDescuento', { static: false }) private modalProductoDescuento: any;
  @ViewChild('modalPresentacionesLeer', { static: false }) private modalPresentacionesLeer: any;

  constructor(private sesionService: SesionService, private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private parametroService: ParametroService, private modalService: NgbModal, private router: Router) { }

  productos: Producto[] = [];
  productoBuscar: Producto = new Producto();

  ngOnInit(): void {
    this.validarSesion();
    this.consultarProductos();
    this.consultarCategorias();
    this.consultarColores();

  }

  consultarProductos() {
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_producto, constantes.error_swal)
      }
    );
  }

  consultarCategorias() {
    this.categoriaService.consultar().subscribe(
      res => {
        this.categorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  seleccionarCategoria() {
    this.subcategorias=[];
    if(this.productoActualizar.categoria!=null){
      this.subcategorias=this.productoActualizar.categoria.subcategorias;
    }
  }

  consultarTallas() {
    this.parametroService.consultarPorTituloTipo(this.productoActualizar.categoria.descripcion, constantes.parametroTalla).subscribe(
      res => {
        this.tallas = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_tallas, constantes.error_swal)
      }
    );
  }

  consultarColores() {
    this.parametroService.consultarPorTipo(constantes.parametroColor).subscribe(
      res => {
        this.colores = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_colores, constantes.error_swal)
      }
    );
  }

  consultarPorCategoriaYSubcategoria() {
    this.productoService.consultarPorCategoriaYSubcategoria(this.categoria.descripcion, this.subcategoria.descripcion).subscribe(
      res => {
        this.productos = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_producto, constantes.error_swal)
      }
    );
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

  disponible(i: number) {
    this.productoActualizar = this.productos[i];
    this.productoService.disponible(this.productoActualizar).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_disponible_producto, constantes.exito_swal);
        this.modalService.dismissAll();
        if (this.imagen != null) {
          this.crearImagen(res.id);
        } else {
          this.consultarProductos();
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_disponible_producto, constantes.error_swal)
      }
    );
  }

  editar(i: number) {
    this.productoActualizar = { ... this.productos[i] };
    this.subcategorias=[];
    if(this.productoActualizar.categoria!=null){
      this.subcategorias = this.productoActualizar.categoria.subcategorias;
    }
    this.open(this.modalProductoActualizar);
  }

  leerPresentaciones(i: number){
    this.productoActualizar = { ... this.productos[i] };
    console.log(this.productoActualizar);
    this.consultarTallas();
    this.open(this.modalPresentacionesLeer);
  }

  crearPresentacion() {
    if (this.presentacionForm.talla.descripcion==constantes.vacio){
      Swal.fire(constantes.error, constantes.error_talla_no_existente, constantes.error_swal);
    }
    if (this.presentacionForm.color.descripcion==constantes.vacio){
      Swal.fire(constantes.error, constantes.error_color_no_existente, constantes.error_swal);
    }
    for (let i = 0; i < this.productoActualizar.presentaciones.length; i++) {
      if (this.presentacionForm.talla.descripcion == this.productoActualizar.presentaciones[i].talla.descripcion
        && this.presentacionForm.color.descripcion == this.productoActualizar.presentaciones[i].color.descripcion) {
        Swal.fire(constantes.error, constantes.error_presentacion_existente, constantes.error_swal);
        return;
      }
    }
    this.productoActualizar.presentaciones.push(this.presentacionForm);
  }

  eliminarPresentacion(i: number) {
    this.productoActualizar.presentaciones.splice(i, 1);
  }

  eliminarImagen(i: number) {
    this.productoActualizar.imagenes.splice(i, 1);
  }

  actualizar() {
    console.log(this.productoActualizar);
    this.productoService.crear(this.productoActualizar).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_actualizar_producto, constantes.exito_swal);
        this.modalService.dismissAll();
        if (this.imagen != null) {
          this.crearImagen(res.id);
        } else {
          this.consultarProductos();
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_actualizar_producto, constantes.error_swal)
      }
    );
  }

  cargarImagen(event: any) {
    let imagenes: FileList = event.target.files;
    this.imagen = imagenes.item(0);
  }

  crearImagen(id: number) {
    this.productoService.crearImagen(this.imagen, id).subscribe(
      res => {
        this.consultarProductos();
        this.imagen = null as any;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_imagen, constantes.error_swal)
      }
    );
  }

  descuento(i: number) {
    this.productoActualizar = { ... this.productos[i] };
    this.open(this.modalProductoDescuento);
  }

  compareFn(a:any, b:any) {
    return a && b && a.id == b.id;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
  }

}
