import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/modelos/categoria';
import { Detalle } from 'src/app/modelos/detalle';
import { Imagen } from 'src/app/modelos/imagen';
import { Parametro } from 'src/app/modelos/parametro';
import { Producto } from 'src/app/modelos/producto';
import { Sesion } from 'src/app/modelos/sesion';
import { Subcategoria } from 'src/app/modelos/subcategoria';
import { Subsubcategoria } from 'src/app/modelos/subsubcategoria';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import * as util from '../../util';

@Component({
  selector: 'app-detallar-producto',
  templateUrl: './detallar-producto.component.html',
  styleUrls: ['./detallar-producto.component.css']
})
export class DetallarProductoComponent implements OnInit {

  tienda=environment.tienda;
  prefijoUrlImg = environment.prefijo_url_img;
  prefijoUrlImgFront = environment.prefijo_url_imgfront;
  logo: Parametro=null as any;
  buscar: string="";
  producto_id: number=0;
  producto: Producto=new Producto();
  detalle: Detalle=null as any;
  imagenes: any[]= [];
  imagen: Imagen= null as any;

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
  campoTalla: boolean = false;
  campoColor: boolean = false;

  campos: Parametro[]=[];
  campo: Parametro=null as any;

  cerrarModal: string="";

  @Input() cantidadAgregados:number;

  @ViewChild('modalCrearLineaPedido', { static: false }) private modalCrearLineaPedido: any;
  

  constructor(private productoService : ProductoService, private parametroService: ParametroService, private modalService: NgbModal,
    private categoriaService: CategoriaService, 
    private sesionService: SesionService, private router: Router, private route: ActivatedRoute ) {
      this.cantidadAgregados=0;
      
     }

  ngOnInit(): void {
    util.loadScripts();
    this.consultarLogo();
    this.producto_id=Number(this.route.snapshot.queryParamMap.get('producto_id')) || 0;
    this.obtenerProducto();
    this.consultarCategorias();
    this.validarSesion();
    
  }

  consultarLogo(){
    this.parametroService.consultarPorTipo(constantes.parametroLogo).subscribe(
      res => {
        this.logo=res[0];
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_logo, constantes.error_swal)
      }
    );
  }

  obtenerProducto(){
    this.productoService.obtener(this.producto_id).subscribe(
      res => {
        this.producto = res;
        this.imagen=this.producto.imagenes[0];
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_producto, constantes.error_swal)
      }
    );
  }

  consultarCategorias(){
    this.categoriaService.consultar().subscribe(
      res => {
        this.categorias=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  abrirModalCrearLineaPedido(){
    this.open(this.modalCrearLineaPedido);
  }

  crearLineaPedido(){

  }

  crear(){
    this.productoService.crear(this.producto).subscribe(
      res => {
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_producto, constantes.error_swal)
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

  cerrarSesion(event:any){
    if (event!=null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

}
