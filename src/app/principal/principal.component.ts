import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LineaPedido } from '../modelos/linea-pedido';
import { SesionService } from '../servicios/sesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagen } from '../modelos/imagen';
import { ParametroService } from '../servicios/parametro.service';
import { Parametro } from '../modelos/parametro';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {

  tienda=environment.tienda;
  prefijoUrlImg = environment.prefijo_url_img;
  prefijoUrlImgFront = environment.prefijo_url_imgfront;
  
  categoria: string="";
  subcategoria: string="";

  sliders: string[]=["slider1.jpg", "slider2.jpeg", "slider3.jpg"];

  @Input() cantidadAgregados:number;

  constructor(private productoService: ProductoService, private parametroService: ParametroService, 
    private sesionService: SesionService, private pedidoService: PedidoService, private clienteService: ClienteService,
    private router: Router, private modalService: NgbModal, private route: ActivatedRoute) {
      this.cantidadAgregados=0;
  }

  productos: Producto[] = [];
  
  productosEnc: any[] = [];

  productoPedido: Producto = null as any;
  presentacionPedido: number = -1;

  lineasPedido: LineaPedido[] = [];

  lineaPedido: LineaPedido = new LineaPedido();

  categoria_zapatos: string=constantes.categoria_zapatos;
  categoria_bolsos: string=constantes.categoria_bolsos;
  categoria_trajes_deportivos: string=constantes.categoria_trajes_deportivos;

  imagenesModal: Imagen[]=[];

  @ViewChild('modalAgregarLineaPedido', { static: false }) private modalAgregarLineaPedido: any;
  @ViewChild('modalLeerImagen', { static: false }) private modalLeerImagen: any;

  cerrarModal: string = "";

  ngOnInit(): void {
    util.loadScripts();
    this.categoria=this.route.snapshot.queryParamMap.get('categoria') || null as any;
    this.subcategoria=this.route.snapshot.queryParamMap.get('subcategoria') || null as any;
    if (this.categoria==null){
      this.categoria=constantes.categoria_zapatos;
      this.subcategoria="";
    }
    this.consultarPorCategoriaYSubcategoria(this.categoria, this.subcategoria);    
    this.construirPedido();
    
  }

  construirPedido(){
    let codigo = this.sesionService.getCodigo();
    if (codigo != null) {
      this.pedidoService.obtenerPorCodigo(codigo).subscribe(
        res => {
          this.cantidadAgregados=res.lineasPedido.length;
        },
        err => {
          Swal.fire(constantes.error, constantes.error_obtener_pedido, constantes.error_swal)
        }
      );
    }
  }

  ngOnDestroy(): void {
  }

  consultarPorCategoriaYSubcategoria(categoria: string, subcategoria: string){
    this.productoService.consultarPorCategoriaYSubcategoria(categoria, subcategoria).subscribe(
      res => {
        this.productos = res
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
    this.lineaPedido.presentacion = this.productoPedido.presentaciones[this.presentacionPedido];
    this.lineaPedido.total= Number(this.productoPedido.precio)- Number(this.productoPedido.descuento);
    this.lineasPedido.push({ ... this.lineaPedido});
    this.lineaPedido = new LineaPedido();
    this.productoPedido=new Producto();
    this.presentacionPedido=-1;
    console.log(this.lineasPedido);
    this.sesionService.setLineasPedido(this.lineasPedido);
    this.cantidadAgregados=this.cantidadAgregados+1;
    Swal.fire(constantes.exito, constantes.exito_agregar_producto, constantes.exito_swal);
  }

  leerImagen(producto: Producto){
    if(producto.imagenes.length>1){
      this.imagenesModal=producto.imagenes;
      this.open(this.modalLeerImagen);
    }
  }

  leerPedidoCliente(event: any) {
    if (event != null)
      event.preventDefault();
    Swal.fire({
      title: constantes.titulo_leer_pedido_cliente,
      text: constantes.ingresar_numero_celular,
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        let cliente: Cliente = new Cliente();
        cliente.celular = result.value;
        this.obtenerCliente(cliente);
      }
    });
  }

  obtenerCliente(cliente: Cliente) {
    this.clienteService.obtenerPorCelular(cliente.celular).subscribe(
      res => {
        if (res != null) {
          this.sesionService.setCliente(res);
          this.navegarLeerPedidoCliente();
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_iniciar_sesion_cliente, constantes.error_swal)
      }
    );
  }

  navegarLeerPedidoCliente() {
    this.router.navigate(['/leer-pedido-cliente']);
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
