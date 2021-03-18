import { Color } from "./color";
import { Imagen } from "./imagen";
import { Talla } from "./talla";

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
    tallas: Talla[];
    imagenes: Imagen[];
    colores: Color[];
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
        this.tallas=[];
        this.colores=[];
        this.imagenes=[];
        this.disponible=false;
    }
}