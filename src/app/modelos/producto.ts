import { Presentacion } from "./presentacion";
import { Imagen } from "./imagen";

export class Producto {
    id: number;
    descripcion: string; 
    material: string;
    marca: string;
    subcategoria: string;
    categoria: string;
    compra: number;
    precio: number;
    descuento: number;
    garantia: string;
    presentaciones: Presentacion[];
    imagenes: Imagen[];
    disponible: boolean;

    constructor(){
        this.id=0;
        this.descripcion="";
        this.material="";
        this.marca="";
        this.subcategoria="";
        this.categoria="";
        this.compra=0;
        this.precio=0;
        this.descuento=0;
        this.garantia="";
        this.presentaciones=[];
        this.imagenes=[];
        this.disponible=false;
    }
}