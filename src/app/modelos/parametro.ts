export class Parametro {
    id: number;
    activo:boolean;
    tipo: string;
    titulo: string;
    valor: string;
    enlace: string;
        
    constructor(){
        this.id=0;
        this.activo=true;
        this.titulo="";
        this.valor="";
        this.tipo="";
        this.enlace="";
    }
}