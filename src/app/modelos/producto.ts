import { Imagen } from "./imagen";
import { Subcategoria } from "./subcategoria";
import { Categoria } from "./categoria";
import { Subsubcategoria } from "./subsubcategoria";
import { Detalle } from "./detalle";

export class Producto {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number; 
    
    categoria: Categoria;
    subcategoria: Subcategoria;
    subsubcategoria: Subsubcategoria;
    material: string;
    marca: string;
    compra: number;
    descuento: number;
    garantia: string;
    tamano: string;
    caracteristica: string;
    talla: string;
    color: string;
    memoria: string;
    procesador: string;
    camara: string;

    detalles: Detalle[];
    imagenes: Imagen[];
    disponible: boolean;

    constructor(){
        this.id=0;
        this.titulo=null as any;
        this.descripcion=null as any;
        this.precio=null as any;
        this.categoria=new Categoria();
        this.subcategoria=new Subcategoria();
        this.subsubcategoria=new Subsubcategoria();
        this.material=null as any;
        this.marca=null as any;
        this.compra=null as any;
        this.descuento=null as any;
        this.garantia=null as any;
        this.tamano=null as any;
        this.caracteristica=null as any;
        this.talla=null as any;
        this.color=null as any;
        this.memoria=null as any;
        this.procesador=null as any;
        this.camara=null as any;
        this.detalles=[];
        this.imagenes=[];
        this.disponible=false;
    }
}