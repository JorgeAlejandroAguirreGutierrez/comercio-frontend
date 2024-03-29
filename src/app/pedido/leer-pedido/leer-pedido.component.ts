import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import * as util from '../../util';
import * as constantes from '../../constantes';
import { DOCUMENT } from '@angular/common';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { Parametro } from 'src/app/modelos/parametro';
import { Sesion } from 'src/app/modelos/sesion';

@Component({
  selector: 'app-leer-pedido',
  templateUrl: './leer-pedido.component.html',
  styleUrls: ['./leer-pedido.component.css']
})
export class LeerPedidoComponent implements OnInit {
  tienda=environment.tienda;
  prefijoUrlImg = environment.prefijo_url_img;
  pedidoActualizar: Pedido= null as any;
  pedidos: Pedido[]=[];
  qr: any= null as any;
  prefijoUrlImagenes = environment.prefijo_url_imgqr;

  estadosPedido: Parametro[]=[];
  estadoPedido: string="";
  celular: string="";

  sesion: Sesion=null as any;
  

  cerrarModal: string="";
  @ViewChild('modalActualizarPedido', { static: false }) private modalActualizarPedido: any;
  @ViewChild('modalVerQr', { static: false }) private modalVerQr: any;

  constructor(private pedidoService: PedidoService, private sesionService: SesionService,
    private parametroService: ParametroService, private modalService: NgbModal, private router: Router,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarPedidos();
    this.consultarEstadosPedido();
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

  consultarPedidos(){
    this.pedidoService.consultar().subscribe(
      res => {
        this.pedidos = res
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  consultarEstadosPedido(){
    this.parametroService.consultarPorTipo(constantes.estado_pedido).subscribe(
      res => {
        this.estadosPedido = res
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  actualizarPedido(){
    console.log(this.pedidoActualizar);
    this.pedidoService.actualizar(this.pedidoActualizar).subscribe(
      res => {
          this.pedidoActualizar=res;
          Swal.fire(constantes.exito, constantes.exito_actualizar_producto, constantes.exito_swal);
          this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  actualizarQr(){
    this.pedidoService.actualizarQr(this.qr, this.pedidoActualizar.id).subscribe(
      res => {
        this.pedidoActualizar=res;
        Swal.fire(constantes.exito, constantes.exito_actualizar_qr, constantes.exito_swal);
        this.modalService.dismissAll();
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  editar(i: number){
    this.qr=null;
    this.pedidoActualizar= this.pedidos[i];
    this.open(this.modalActualizarPedido);
  }

  verQr(i: number){
    this.pedidoActualizar= {... this.pedidos[i]};
    this.open(this.modalVerQr);
  }

  consultarPorCelularEstadoPedido(){
    this.pedidoService.consultarPorCelularEstadoPedido(this.celular, this.estadoPedido).subscribe(
      res => {
        this.pedidos=res;
        Swal.fire(constantes.exito, constantes.exito_consultar_por_estado_pedido, constantes.exito_swal);
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_por_estado_pedido, constantes.error_swal)
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
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

  cargarQr(event: any){
    let qrs: FileList=event.target.files;
    this.qr=qrs.item(0);
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
