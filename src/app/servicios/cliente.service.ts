import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Pedido } from '../modelos/pedido';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private http: HttpClient, private router: Router) { }

  crear(cliente: Cliente): Observable<Cliente> {
    return this.http.post(environment.host + util.ruta + util.cliente, cliente, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Cliente[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<Cliente[]> {
    return await this.http.get<Cliente[]>(environment.host + util.ruta + util.cliente, util.options).pipe(
      map(response => response as Cliente[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(environment.host + util.ruta + util.cliente + '/' + id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Cliente> {
    return await this.http.get<Cliente>(environment.host + util.ruta + util.cliente + '/' + id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put(environment.host + util.ruta + util.cliente, cliente, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Cliente> {
    return this.http.delete(environment.host + util.ruta + util.cliente + '/' + id, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerPorCelular(celular: string): Observable<Cliente> {
    return this.http.get<Cliente>(environment.host + util.ruta + util.cliente+util.obtenerporcelular + '/' + celular, util.options).pipe(
      map(response => response as Cliente),
      catchError(err => {
        return throwError(err);
      }));
  }
}