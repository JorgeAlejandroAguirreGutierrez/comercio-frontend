import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Sesion } from '../modelos/sesion';
import { Cliente } from '../modelos/cliente';
import { LineaPedido } from '../modelos/linea-pedido';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(sesion: Sesion): Observable<Sesion> {
    return this.http.post(environment.host + util.ruta + util.sesion, sesion, util.options).pipe(
      map(response => response as Sesion),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  setSesion(sesion: Sesion) {
    sessionStorage.setItem("sesion", JSON.stringify(sesion));
  }

  getSesion(): Sesion {
    return JSON.parse(sessionStorage.getItem("sesion") || '{}');
  }

  adminLogueado(){
    let sesion=JSON.parse(sessionStorage.getItem("sesion") || null as any);
    return sesion!=null;
  }

  cerrarSesion(){
    sessionStorage.removeItem("sesion");
  }

  setLineasPedido(lineasPedido: LineaPedido[]){
    localStorage.setItem("lineasPedido", JSON.stringify(lineasPedido));
  }

  getLineasPedido(): LineaPedido[] {
    let obj = JSON.parse(localStorage.getItem("lineasPedido") || null as any);
    let lobj: LineaPedido[] = <LineaPedido[]>obj;
    return lobj;
  }

  eliminarLineasPedido(){
    localStorage.removeItem("lineasPedido");
  }

  setCodigo(codigo: string){
    localStorage.setItem("codigo", JSON.stringify(codigo));
  }

  getCodigo(): string {
    let codigo = JSON.parse(localStorage.getItem("codigo") || null as any);
    return codigo;
  }

  eliminarCodigo(){
    localStorage.removeItem("codigo");
  }

  setCliente(cliente: Cliente){
    localStorage.setItem("cliente", JSON.stringify(cliente));
  }

  getCliente(): Cliente {
    let obj = JSON.parse(localStorage.getItem("cliente") || null as any);
    let lobj: Cliente = <Cliente>obj;
    return lobj;
  }

  eliminarCliente(){
    localStorage.removeItem('cliente');
  }
}