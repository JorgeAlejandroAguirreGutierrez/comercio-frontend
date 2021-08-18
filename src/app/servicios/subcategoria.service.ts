import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Subcategoria } from '../modelos/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(private http: HttpClient) { }

  crear(subcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.post(environment.host + util.ruta + util.subcategoria, subcategoria, util.options).pipe(
      map(response => response as Subcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(environment.host + util.ruta + util.subcategoria, util.options).pipe(
      map(response => response as Subcategoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(id: number): Observable<Subcategoria> {
    return this.http.get<Subcategoria>(environment.host + util.ruta + util.subcategoria + '/' + id, util.options).pipe(
      map(response => response as Subcategoria),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarPorCategoria(categoria_id: number): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(environment.host + util.ruta + util.subcategoria+ util.consultarPorCategoria + '/' + categoria_id, util.options).pipe(
      map(response => response as Subcategoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(subcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.put(environment.host + util.ruta + util.subcategoria, subcategoria, util.options).pipe(
      map(response => response as Subcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Subcategoria> {
    return this.http.delete(environment.host + util.ruta + util.subcategoria + '/' + id, util.options).pipe(
      map(response => response as Subcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}