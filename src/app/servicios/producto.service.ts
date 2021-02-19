import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post(environment.host + util.ruta + util.producto, producto, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.host + util.ruta + util.producto, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<Producto[]> {
    return await this.http.get<Producto[]>(environment.host + util.ruta + util.producto, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(environment.host + util.ruta + util.producto + '/' + id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Producto> {
    return await this.http.get<Producto>(environment.host + util.ruta + util.producto + '/' + id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(producto: Producto): Observable<Producto> {
    return this.http.put(environment.host + util.ruta + util.producto, producto, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Producto> {
    return this.http.delete(environment.host + util.ruta + util.producto + '/' + id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(producto: Producto): Observable<Producto[]> {
    return this.http.put(environment.host+util.ruta+util.producto+util.buscar, producto, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorTipo(tipo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.host + util.ruta + util.producto+util.consultarPorTipo+'/'+tipo, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  crearImagen(imagen: File, id: number): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(environment.host + util.ruta + util.producto + '/imagen' + '/' + id, formData, util.optionsImagen).pipe(
      map(response => response as any),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}