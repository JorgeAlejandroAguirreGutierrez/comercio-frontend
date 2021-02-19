import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Pedido } from '../modelos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  constructor(private http: HttpClient, private router: Router) { }
  crear(pedido: Pedido): Observable<Pedido> {
    return this.http.post(environment.host + util.ruta + util.pedido, pedido, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<Pedido[]> {
    return await this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Pedido> {
    return await this.http.get<Pedido>(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(pedido: Pedido): Observable<Pedido> {
    return this.http.put(environment.host + util.ruta + util.pedido, pedido, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Pedido> {
    return this.http.delete(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizarQr(qr: File, id: number): Observable<Pedido> {
    const formData: FormData = new FormData();
    formData.append('qr', qr, qr.name);
    return this.http.post(environment.host + util.ruta + util.pedido + util.qr + '/' + id, formData, util.optionsImagen).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorCliente(celular: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido + util.consultarPorCliente + '/' + celular, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      }));
  }

  obtenerPorCodigo(codigo: string): Observable<Pedido> {
    return this.http.get<Pedido>(environment.host + util.ruta + util.pedido + util.obtenerporcodigo + '/' + codigo, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      }));
  }

  generar(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(environment.host + util.ruta + util.pedido + util.generar, pedido, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarPorEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido + util.consultarPorEstadoPedido + '/'+estado, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      }));
  }

  descargarQr(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}