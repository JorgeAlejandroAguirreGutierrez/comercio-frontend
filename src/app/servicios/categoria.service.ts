import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(categoria: Categoria): Observable<Categoria> {
    return this.http.post(environment.host + util.ruta + util.categoria, categoria, util.options).pipe(
      map(response => response as Categoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.host + util.ruta + util.categoria, util.options).pipe(
      map(response => response as Categoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(environment.host + util.ruta + util.categoria + '/' + id, util.options).pipe(
      map(response => response as Categoria),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(categoria: Categoria): Observable<Categoria> {
    return this.http.put(environment.host + util.ruta + util.categoria, categoria, util.options).pipe(
      map(response => response as Categoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Categoria> {
    return this.http.delete(environment.host + util.ruta + util.categoria + '/' + id, util.options).pipe(
      map(response => response as Categoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  eliminarPorCategoriaSubcategoriaSubsubcategoria(categoria:string, subcategoria: string, subsubcategoria: string): Observable<Categoria> {
    let params = new HttpParams()
    .set('categoria', categoria)
    .set('subcategoria', subcategoria)
    .set('subsubcategoria', subsubcategoria);
    return this.http.delete(environment.host + util.ruta + util.categoria+ util.eliminarPorCategoriaSubcategoriaSubsubcategoria, {params: params, headers: util.options.headers}).pipe(
      map(response => response as any),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(categoria: Categoria): Observable<Categoria[]> {
    return this.http.put(environment.host+util.ruta+util.categoria+util.buscar, categoria, util.options).pipe(
      map(response => response as Categoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}