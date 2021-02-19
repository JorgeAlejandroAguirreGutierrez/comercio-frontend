import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { Pedido } from 'src/app/modelos/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { environment } from './../../../environments/environment';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leer-pedido-cliente',
  templateUrl: './leer-pedido-cliente.component.html',
  styleUrls: ['./leer-pedido-cliente.component.css']
})
export class LeerPedidoClienteComponent implements OnInit {

  pedidos: Pedido[]=[];
  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  pedidoActualizar: Pedido= null as any;

  cerrarModal: string="";
  @ViewChild('modalVerQr', { static: false }) private modalVerQr: any;

  constructor(private pedidoService: PedidoService, 
    private modalService: NgbModal, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.consultarPedidos();
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

  verQr(i: number){
    this.pedidoActualizar= {... this.pedidos[i]};
    this.open(this.modalVerQr);
  }

  descargarQr(path: string): void {
    let url=this.prefijoUrlImagenes+path;
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
