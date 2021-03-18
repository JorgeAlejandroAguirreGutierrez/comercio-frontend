'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/comercio';
export const producto: string='/producto';
export const parametro: string='/parametro';
export const consultarPorTipo: string='/consultarPorTipo';
export const consultarPorCategoria: string='/consultarPorCategoria';
export const consultarPorMarcaCategoriaSubcategoria: string='/consultarPorMarcaCategoriaSubcategoria';
export const consultarPorMarcaCategoria: string='/consultarPorMarcaCategoria';
export const consultarPorTituloTipo: string='/consultarPorTituloTipo';
export const validar: string='/validar';
export const cliente: string='/cliente';
export const pedido: string='/pedido';
export const usuario: string='/usuario';
export const sesion: string='/sesion';
export const buscar: string='/buscar';
export const consultarPorCliente: string='/consultarporcliente';
export const consultarPorEstadoPedido: string='/consultarporestadopedido';
export const consultarPorCelularEstadoPedido: string='/consultarporcelularestadopedido';
export const obtenerporcodigo: string='/obtenerporcodigo';
export const confirmar: string='/confirmar'
export const generar: string='/generar'
export const obtenerporcelular: string='/obtenerporcelular';
export const qr: string='/qr';
export const disponible: string='/disponible';


export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};
export const headersImagen= new HttpHeaders({});
export const optionsImagen = {headers: headersImagen};