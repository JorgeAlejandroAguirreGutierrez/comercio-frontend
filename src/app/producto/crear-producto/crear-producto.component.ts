import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Parametro } from 'src/app/modelos/parametro';
import { Producto } from 'src/app/modelos/producto';
import { Sesion } from 'src/app/modelos/sesion';
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
import { Subsubcategoria } from 'src/app/modelos/subsubcategoria';
import { SubcategoriaService } from 'src/app/servicios/subcategoria.service';
import { SubsubcategoriaService } from 'src/app/servicios/subsubcategoria.service';
import { Detalle } from 'src/app/modelos/detalle';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  tienda=environment.tienda;
  producto: Producto=new Producto();
  detalle: Detalle=null as any;
  imagenes: any[]= [];

  categorias: Categoria[]=[];
  subcategorias: Subcategoria[]=[];
  subsubcategorias: Subsubcategoria[]=[];
  tallas: Parametro[]=[];
  colores: Parametro[]=[];

  sesion: Sesion=null as any;

  /*CAMPOS*/
  campoMarca: boolean = false;
  campoMaterial: boolean = false;
  campoCompra: boolean = false;
  campoDescuento: boolean = false;
  campoGarantia: boolean = false;
  campoTamano: boolean = false;
  campoTalla: boolean = false;
  campoColor: boolean = false;
  campoCaracteristica: boolean = false;
  campoMemoria: boolean = false;
  campoProcesador: boolean = false;
  campoCamara: boolean = false;

  campos: Parametro[]=[];
  campo: Parametro=null as any;

  cerrarModal: string="";

  @ViewChild('modalCrearDetalle', { static: false }) private modalCrearDetalle: any;
  

  constructor(private productoService : ProductoService, private parametroService: ParametroService, private modalService: NgbModal,
    private categoriaService: CategoriaService, private subcategoriaService: SubcategoriaService, private subsubcategoriaService: SubsubcategoriaService,
    private sesionService: SesionService, private router: Router ) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarCampos();
    this.consultarCategorias();
    this.consultarColores();
    
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

  consultarCampos(){
    this.parametroService.consultarPorTipo(constantes.parametroCampo).subscribe(
      res => {
        this.campos = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_campos, constantes.error_swal)
      }
    );
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

  agregarCampo(){
    if(this.campo.titulo == constantes.campoMarca)
      this.campoMarca=true;
    if(this.campo.titulo == constantes.campoMaterial)
      this.campoMaterial=true;
    if(this.campo.titulo == constantes.campoCompra)
      this.campoCompra=true;
    if(this.campo.titulo == constantes.campoDescuento)
      this.campoDescuento=true;
    if(this.campo.titulo == constantes.campoGarantia)
      this.campoGarantia=true;
    if(this.campo.titulo == constantes.campoTamano)
      this.campoTamano=true;
    if(this.campo.titulo == constantes.campoTalla)
      this.campoTalla=true;
    if(this.campo.titulo == constantes.campoColor)
      this.campoColor=true;
    if(this.campo.titulo == constantes.campoCaracteristica)
      this.campoCaracteristica=true;
    if(this.campo.titulo == constantes.campoMemoria)
      this.campoMemoria=true;
    if(this.campo.titulo == constantes.campoProcesador)
      this.campoProcesador=true;
    if(this.campo.titulo == constantes.campoCamara)
      this.campoCamara=true;
  }

  seleccionarCategoria(){
    if (this.producto.categoria!=null){
      this.subcategoriaService.consultarPorCategoria(this.producto.categoria.id).subscribe(
        res => {
            this.subcategorias=res;
        },
        err => {
          Swal.fire(constantes.error, constantes.error_consultar_por_categoria, constantes.error_swal)
        }
      );
    } else{
      this.subcategorias=[];
    }
  }

  seleccionarSubcategoria(){
    if (this.producto.subcategoria!=null){
      this.subsubcategoriaService.consultarPorSubcategoria(this.producto.subcategoria.id).subscribe(
        res => {
            this.subsubcategorias=res;
        },
        err => {
          Swal.fire(constantes.error, constantes.error_consultar_por_subcategoria, constantes.error_swal)
        }
      );
    } else {
      this.subsubcategorias=[];
    }
  }

  abrirModalCrearDetalle(){
    this.detalle=new Detalle();
    this.open(this.modalCrearDetalle);
  }

  crearDetalle(){
    this.modalService.dismissAll();
    this.producto.detalles.push({... this.detalle});
  }

  eliminarDetalle(i: number){
    this.producto.detalles.splice(i, 1);
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
