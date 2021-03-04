import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from '../../../../environments/environment';
import * as constantes from '../../../constantes';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parametro } from 'src/app/modelos/parametro';
import { ParametroService } from 'src/app/servicios/parametro.service';

@Component({
  selector: 'app-leer-pedido-cliente',
  templateUrl: './leer-pedido-cliente.component.html',
  styleUrls: ['./leer-pedido-cliente.component.css']
})
export class LeerPedidoClienteComponent implements OnInit {

  pagina=constantes.pagina;
  pedidos: Pedido[]=[];
  prefijoUrlImgqr = environment.prefijo_url_imgqr;
  mediosPago: Parametro[]=[];

  pedidoActualizar: Pedido= null as any;

  estadosPedido: Parametro[]=[];
  estadoPedido: string="";

  cerrarModal: string="";
  @ViewChild('modalVerQr', { static: false }) private modalVerQr: any;
  @ViewChild('modalLeerMediosPago', { static: false }) private modalLeerMediosPago: any;

  constructor(private pedidoService: PedidoService, private parametroService: ParametroService,
    private modalService: NgbModal, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.consultarPedidos();
    this.consultarEstadosPedido();
    this.consultarMediosPago();
  }

  consultarPedidos(){
    let cliente: Cliente=this.sesionService.getCliente();
    this.pedidoService.consultarPorCliente(cliente.celular).subscribe(
      res => {
          this.pedidos=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_pedido, constantes.error_swal)
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

  consultarPorEstadoPedido(){
    let cliente: Cliente=this.sesionService.getCliente();
    this.pedidoService.consultarPorCelularEstadoPedido(cliente.celular, this.estadoPedido).subscribe(
      res => {
        this.pedidos=res;
        Swal.fire(constantes.exito, constantes.exito_consultar_por_estado_pedido, constantes.exito_swal);
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_por_estado_pedido, constantes.error_swal)
      }
    );
  }

  leerMediosPago(){
    this.open(this.modalLeerMediosPago);
  }

  verQr(i: number){
    this.pedidoActualizar= {... this.pedidos[i]};
    this.open(this.modalVerQr);
  }

  descargarQr(path: string): void {
    let url=this.prefijoUrlImgqr+path;
    this.pedidoService
      .descargarQr(url)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = path;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  consultarMediosPago(){
    this.parametroService.consultarPorTipo(constantes.parametroMedioPago).subscribe(
      res => {
        this.mediosPago = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_colores, constantes.error_swal)
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
}
