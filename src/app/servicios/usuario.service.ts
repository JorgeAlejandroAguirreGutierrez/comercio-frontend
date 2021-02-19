import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.host + util.ruta + util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.host + util.ruta + util.usuario, util.options).pipe(
      map(response => response as Usuario[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Usuario[]> {
    return await this.http.get<Usuario[]>(environment.host + util.ruta + util.usuario, util.options).pipe(
      map(response => response as Usuario[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(usuario_id: number): Observable<Usuario> {
    return this.http.get<Usuario>(environment.host + util.ruta + util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Usuario),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(usuario_id: number): Promise<Usuario> {
    return await this.http.get<Usuario>(environment.host + util.ruta + util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Usuario),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put(environment.host+util.ruta+util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(usuario_id: number): Observable<Producto> {
    return this.http.delete(environment.host+util.ruta+util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  inciarSesion(usuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.host + util.ruta + util.usuario+ '/iniciarsesion', usuario, util.options).pipe(
      map(response => response as Usuario),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}