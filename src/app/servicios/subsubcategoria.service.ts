import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Subsubcategoria } from '../modelos/subsubcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubsubcategoriaService {

  constructor(private http: HttpClient) { }

  crear(subsubcategoria: Subsubcategoria): Observable<Subsubcategoria> {
    return this.http.post(environment.host + util.ruta + util.subsubcategoria, subsubcategoria, util.options).pipe(
      map(response => response as Subsubcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Subsubcategoria[]> {
    return this.http.get<Subsubcategoria[]>(environment.host + util.ruta + util.subsubcategoria, util.options).pipe(
      map(response => response as Subsubcategoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtener(id: number): Observable<Subsubcategoria> {
    return this.http.get<Subsubcategoria>(environment.host + util.ruta + util.subsubcategoria + '/' + id, util.options).pipe(
      map(response => response as Subsubcategoria),
      catchError(err => {
        return throwError(err);
      }));
  }

  consultarPorSubcategoria(subcategoria_id: number): Observable<Subsubcategoria[]> {
    return this.http.get<Subsubcategoria[]>(environment.host + util.ruta + util.subsubcategoria+ util.consultarPorSubcategoria + '/' + subcategoria_id, util.options).pipe(
      map(response => response as Subsubcategoria[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizar(subsubcategoria: Subsubcategoria): Observable<Subsubcategoria> {
    return this.http.put(environment.host + util.ruta + util.subsubcategoria, subsubcategoria, util.options).pipe(
      map(response => response as Subsubcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Subsubcategoria> {
    return this.http.delete(environment.host + util.ruta + util.subsubcategoria + '/' + id, util.options).pipe(
      map(response => response as Subsubcategoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}