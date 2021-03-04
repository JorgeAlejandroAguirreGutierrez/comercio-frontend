import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../modelos/producto';
import { ProductoService } from '../../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../../constantes';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Color } from 'src/app/modelos/color';
import { Talla } from 'src/app/modelos/talla';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { Parametro } from 'src/app/modelos/parametro';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.component.html',
  styleUrls: ['./leer-producto.component.css']
})
export class LeerProductoComponent implements OnInit {

  pagina = constantes.pagina;
  productoActualizar: Producto = new Producto();
  tallaForm: string = "";
  colorForm: string = "";
  imagen: any = null as any;
  categorias: Parametro[] = [];
  subcategorias: Parametro[] = [];
  tallas: Parametro[] = [];
  colores: Parametro[] = [];

  marca: string = "";
  categoria: string = "";
  subcategoria: string = "";


  cerrarModal: string = "";

  @ViewChild('modalProductoActualizar', { static: false }) private modalProductoActualizar: any;
  @ViewChild('modalProductoDescuento', { static: false }) private modalProductoDescuento: any;

  constructor(private sesionService: SesionService, private productoService: ProductoService,
    private parametroService: ParametroService, private modalService: NgbModal, private router: Router) { }

  productos: Producto[] = [];
  productoBuscar: Producto = new Producto();

  ngOnInit(): void {
    this.validarSesion();
    this.consultarProductos();
    this.consultarCategorias();
    this.consultarTallas();
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
    this.parametroService.consultarPorTipo(constantes.parametroCategoria).subscribe(
      res => {
        this.categorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  consultarSubcategorias() {
    this.parametroService.consultarPorTituloTipo(this.categoria, constantes.parametroSubcategoria).subscribe(
      res => {
        this.subcategorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_colores, constantes.error_swal)
      }
    );
  }

  seleccionarCategoria() {
    this.consultarSubcategorias();
  }

  consultarTallas() {
    this.parametroService.consultarPorTipo(constantes.parametroTalla).subscribe(
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

  consultarPorMarcaCategoriaSubcategoria() {
    this.productoService.consultarPorMarcaCategoriaSubcategoria(this.marca, this.categoria, this.subcategoria).subscribe(
      res => {
        this.productos = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_producto, constantes.error_swal)
      }
    );
  }

  validarSesion() {
    let usuarioActivo = this.sesionService.adminLogueado();
    if (!usuarioActivo) {
      this.navegarIndex();
    }
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
    this.open(this.modalProductoActualizar);
  }

  crearTalla() {
    for (let i = 0; i < this.productoActualizar.tallas.length; i++) {
      if (this.tallaForm == this.productoActualizar.tallas[i].descripcion) {
        Swal.fire(constantes.error, constantes.error_talla_existente, constantes.error_swal);
        return;
      }
    }
    let talla: Talla = new Talla();
    talla.descripcion = this.tallaForm;
    this.productoActualizar.tallas.push(talla);
  }

  eliminarTalla(i: number) {
    this.productoActualizar.tallas.splice(i, 1);
  }

  crearColor() {
    for (let i = 0; i < this.productoActualizar.colores.length; i++) {
      if (this.colorForm == this.productoActualizar.colores[i].descripcion) {
        Swal.fire(constantes.error, constantes.error_color_existente, constantes.error_swal);
        return;
      }
    }
    let color: Color = new Color();
    color.descripcion = this.colorForm;
    this.productoActualizar.colores.push(color);
  }

  eliminarColor(i: number) {
    this.productoActualizar.colores.splice(i, 1);
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
