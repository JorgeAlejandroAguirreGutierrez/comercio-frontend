import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Producto } from '../../modelos/producto';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaPedido } from '../../modelos/linea-pedido';
import { SesionService } from '../../servicios/sesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagen } from '../../modelos/imagen';
import { ParametroService } from '../../servicios/parametro.service';
import { Parametro } from '../../modelos/parametro';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy {

  @Input() cantidadAgregados:Number;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private productoService: ProductoService, private parametroService: ParametroService, private sesionService: SesionService,
    private router: Router, private modalService: NgbModal, private route: ActivatedRoute) {
      this.cantidadAgregados=0;
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  pagina=constantes.pagina;
  marca: string="";
  categoria: string="";
  subcategoria: string="";

  productos: Producto[] = [];
  
  productosEnc: any[] = [];

  productoPedido: Producto = null as any;
  tallaPedido: number = -1;
  colorPedido: number = -1;

  lineasPedido: LineaPedido[] = [];

  lineaPedido: LineaPedido = new LineaPedido();

  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  categoria_zapatos: string=constantes.categoria_zapatos;
  categoria_bolsos: string=constantes.categoria_bolsos;
  categoria_trajes_deportivos: string=constantes.categoria_trajes_deportivos;

  imagenesModal: Imagen[]=[];

  categorias: Parametro[]=[
    {id:1, activo:true, tipo:'CATEGORIA',titulo:'', valor:'PROMOCIONES', enlace:'categoria_zapatos'},
    {id:1, activo:true, tipo:'CATEGORIA',titulo:'', valor:'ZAPATOS', enlace:'categoria_zapatos'},
    {id:1, activo:true, tipo:'CATEGORIA',titulo:'', valor:'BOLSOS', enlace:'categoria_bolsos'},
    {id:1, activo:true, tipo:'CATEGORIA',titulo:'', valor:'TRAJES DEPOSTIVOS', enlace:'categoria_trajes_deportivos'},
  ];


  subcategorias: Parametro[]=[];

  //filasNav = Array.from({length: 20}, (_, i) => `Nav Item ${i + 1}`);
  filasNav = this.categorias;

  //fillerContent = Array.from({length: 20}, () =>
  //    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //     labore et dolore magna aliqua.`);

  @ViewChild('modalAgregarLineaPedido', { static: false }) private modalAgregarLineaPedido: any;
  @ViewChild('modalLeerImagen', { static: false }) private modalLeerImagen: any;

  cerrarModal: string = "";

  ngOnInit(): void {
    this.categoria=this.route.snapshot.queryParamMap.get('producto') || null as any;
    console.log(this.categoria);
    if(this.categoria==null){
      this.categoria=this.categoria_zapatos;
    }
    this.consultarPorCategoria();
    //this.consultarCategorias(); //Revisar para traer todas las categorias al menu
    console.log(this.categorias);
    this.consultarSubcategorias();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  consultarPorCategoria(){
    this.productoService.consultarPorCategoria(this.categoria).subscribe(
      res => {
        this.productos = res
        let productosRec: Producto[] = [];
        for (let i = 0; i < this.productos.length; i++) {
          productosRec.push(this.productos[i]);
          if (productosRec.length == 3) {
            this.productosEnc.push(productosRec);
            productosRec = [];
          }
        }
        if (productosRec.length > 0) {
          this.productosEnc.push(productosRec);
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_producto, constantes.error_swal)
      }
    );
  }
//Revisar Jorge, creo que falta en el back
  consultarCategorias(){
    this.parametroService.consultarCategorias().subscribe(
      res => {
        this.categorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  consultarSubcategorias(){
    this.parametroService.consultarPorTituloTipo(this.categoria, constantes.parametroSubcategoria).subscribe(
      res => {
        this.subcategorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_subcategorias, constantes.error_swal)
      }
    );
  }

  consultarPorMarcaCategoriaSubcategoria(){
    this.productoService.consultarPorMarcaCategoriaSubcategoria(this.marca, this.categoria, this.subcategoria).subscribe(
      res => {
        this.productos = res;
        this.productosEnc = [];
        console.log(this.productos);
        let productosRec: Producto[] = [];
        for (let i = 0; i < this.productos.length; i++) {
          productosRec.push(this.productos[i]);
          if (productosRec.length == 3) {
            this.productosEnc.push(productosRec);
            productosRec = [];
          }
        }
        if (productosRec.length > 0) {
          this.productosEnc.push(productosRec);
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_producto, constantes.error_swal)
      }
    );
  }

  agregarLineaPedido(producto: Producto) {
    this.productoPedido = producto;
    this.open(this.modalAgregarLineaPedido);
  }

  crearLineaPedido() {
    this.modalService.dismissAll();
    this.lineaPedido.producto = this.productoPedido;
    this.lineaPedido.talla = this.productoPedido.tallas[this.tallaPedido];
    this.lineaPedido.color = this.productoPedido.colores[this.colorPedido];
    this.lineaPedido.total= this.productoPedido.precio-(this.productoPedido.precio*this.productoPedido.descuento)/100;
    this.lineasPedido.push({ ... this.lineaPedido});
    this.lineaPedido = new LineaPedido();
    this.productoPedido=new Producto();
    this.tallaPedido=-1;
    this.colorPedido=-1;
    console.log(this.lineasPedido);
    this.sesionService.setLineasPedido(this.lineasPedido);
    Swal.fire(constantes.exito, constantes.exito_agregar_producto, constantes.exito_swal);
  }

  leerImagen(producto: Producto){
    if(producto.imagenes.length>1){
      this.imagenesModal=producto.imagenes;
      console.log(this.imagenesModal);
      this.open(this.modalLeerImagen);
    }
  }

  navegarPedido() {
    this.router.navigate(['/resumen-pedido']);
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
}
