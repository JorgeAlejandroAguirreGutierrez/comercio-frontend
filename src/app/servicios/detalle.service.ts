import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Detalle } from '../modelos/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(detalle: Detalle): Observable<Detalle> {
    return this.http.post(environment.host + util.ruta + util.detalle, detalle, util.options).pipe(
      map(response => response as Detalle),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(environment.host + util.ruta + util.detalle, util.options).pipe(
      map(response => response as Detalle[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(id: number): Observable<Detalle> {
    return this.http.get<Detalle>(environment.host + util.ruta + util.detalle + '/' + id, util.options).pipe(
      map(response => response as Detalle),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(detalle: Detalle): Observable<Detalle> {
    return this.http.put(environment.host + util.ruta + util.detalle, detalle, util.options).pipe(
      map(response => response as Detalle),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Detalle> {
    return this.http.delete(environment.host + util.ruta + util.detalle + '/' + id, util.options).pipe(
      map(response => response as Detalle),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(detalle: Detalle): Observable<Detalle[]> {
    return this.http.put(environment.host+util.ruta+util.detalle+util.buscar, detalle, util.options).pipe(
      map(response => response as Detalle[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}