import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as constantes from '../constantes';
import { Parametro } from '../modelos/parametro';
import { ParametroService } from '../servicios/parametro.service';
import { SesionService } from '../servicios/sesion.service';
import * as util from '../util';
import Swal from 'sweetalert2';
import { CategoriaService } from '../servicios/categoria.service';
import { Categoria } from '../modelos/categoria';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subcategoria } from '../modelos/subcategoria';
import { Subsubcategoria } from '../modelos/subsubcategoria';
import { SubcategoriaService } from '../servicios/subcategoria.service';
import { SubsubcategoriaService } from '../servicios/subsubcategoria.service';
import { Sesion } from '../modelos/sesion';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  tienda=environment.tienda;
  comercio: string="";
  ubicacion: string="";

  sesion: Sesion=null as any;

  buscarCategoria: String="";
  buscarSubcategoria: String ="";
  buscarSubsubcategoria: String="";

  crearCategoria: Categoria= new Categoria();
  crearSubcategoria: Subcategoria= new Subcategoria();
  crearSubsubcategoria: Subsubcategoria= new Subsubcategoria();
  asignarCategoria: Categoria=null as any;
  asignarSubcategoria: Subcategoria=null as any;

  categoriasEnc:any[]=[];
  categorias: Categoria[]=[];
  subcategorias: Subcategoria[]=[];
  subsubcategorias: Subsubcategoria[]=[];

  cerrarModal: string="";

  @ViewChild('modalCrearCategoria', { static: false }) private modalCrearCategoria: any;
  @ViewChild('modalCrearSubcategoria', { static: false }) private modalCrearSubcategoria: any;
  @ViewChild('modalCrearSubsubcategoria', { static: false }) private modalCrearSubsubcategoria: any;
  
  constructor(private sesionService: SesionService, private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService, private subsubcategoriaService: SubsubcategoriaService,
     private router: Router, private modalService: NgbModal ) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarCategoriasEnc();
  }

  consultarCategoriasEnc(){
    this.categoriasEnc=[];
    this.categoriaService.consultar().subscribe(
      res => {
        let categorias: Categoria[] = res
        for(let i=0; i<categorias.length; i++){
          let categoriaEnc: string[]=[];
          categoriaEnc.push(categorias[i].descripcion);
          if (categorias[i].subcategorias.length==0){
            categoriaEnc.push(constantes.vacio);
            categoriaEnc.push(constantes.vacio);
            this.categoriasEnc.push(categoriaEnc);
            categoriaEnc=[];
          }
          for(let j=0; j<categorias[i].subcategorias.length; j++){
            categoriaEnc=[];
            categoriaEnc.push(categorias[i].descripcion);
            categoriaEnc.push(categorias[i].subcategorias[j].descripcion);
            if(categorias[i].subcategorias[j].subsubcategorias.length==0){
              categoriaEnc.push(constantes.vacio);
              this.categoriasEnc.push(categoriaEnc);
              categoriaEnc=[];
            }
            for(let k=0; k<categorias[i].subcategorias[j].subsubcategorias.length; k++){
              categoriaEnc=[];
              categoriaEnc.push(categorias[i].descripcion);
              categoriaEnc.push(categorias[i].subcategorias[j].descripcion);
              categoriaEnc.push(categorias[i].subcategorias[j].subsubcategorias[k].descripcion);
              this.categoriasEnc.push(categoriaEnc);
            }
          }
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  consultarCategorias(){
    this.categoriaService.consultar().subscribe(
      res => {
        this.categorias = res
        console.log(this.categorias); 
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_categorias, constantes.error_swal)
      }
    );
  }

  consultarSubcategorias(){
    this.subcategoriaService.consultar().subscribe(
      res => {
        this.subcategorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_subcategorias, constantes.error_swal)
      }
    );
  }

  consultarSubsubcategorias(){
    this.subsubcategoriaService.consultar().subscribe(
      res => {
        this.subsubcategorias = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_subsubcategorias, constantes.error_swal)
      }
    );
  }

  buscar(){

  }

  crearCategoriaAccion(){
    this.categoriaService.crear(this.crearCategoria).subscribe(
      res => {
        this.modalService.dismissAll();
        this.consultarCategoriasEnc();
        Swal.fire(constantes.exito, constantes.exito_crear_categoria, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_categoria, constantes.error_swal)
      }
    );
  }

  crearSubcategoriaAccion(){
    this.crearSubcategoria.categoria={ ... this.asignarCategoria};
    this.asignarCategoria=null as any;
    this.subcategoriaService.crear(this.crearSubcategoria).subscribe(
      res => {
        this.modalService.dismissAll();
        this.consultarCategoriasEnc();
        Swal.fire(constantes.exito, constantes.exito_crear_subcategoria, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_subcategoria, constantes.error_swal)
      }
    );
  }

  crearSubsubcategoriaAccion(){
    this.crearSubsubcategoria.subcategoria={ ... this.asignarSubcategoria};
    this.crearSubsubcategoria.subcategoria.categoria={ ... this.asignarCategoria};
    this.asignarSubcategoria=null as any;
    this.asignarCategoria=null as any;
    this.subsubcategoriaService.crear(this.crearSubsubcategoria).subscribe(
      res => {
        this.modalService.dismissAll();
        this.consultarCategoriasEnc();
        Swal.fire(constantes.exito, constantes.exito_crear_subcategoria, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, constantes.error_crear_subsubcategoria, constantes.error_swal)
      }
    );
  }

  eliminar(categoriaCompleta: string[]){
    let categoria=categoriaCompleta[0];
    let subcategoria= categoriaCompleta[1];
    let subsubcategoria= categoriaCompleta[2];
    this.categoriaService.eliminarPorCategoriaSubcategoriaSubsubcategoria(categoria, subcategoria, subsubcategoria).subscribe(
      res => {
        this.consultarCategoriasEnc();
        Swal.fire(constantes.exito, constantes.exito_eliminar_categoria, constantes.exito_swal)
      },
      err => {
        Swal.fire(constantes.error, constantes.error_eliminar_categoria, constantes.error_swal)
      }
    );
  }

  abrirModalCrearCategoria(){
    this.crearCategoria=new Categoria();
    this.consultarCategorias();
    this.open(this.modalCrearCategoria);
  }
  abrirModalCrearSubcategoria(){
    this.asignarCategoria=null as any;
    this.crearSubcategoria=new Subcategoria();
    this.consultarCategorias();
    this.open(this.modalCrearSubcategoria);
  }
  abrirModalCrearSubsubcategoria(){
    this.asignarCategoria=null as any;
    this.asignarSubcategoria=null as any;
    this.crearSubsubcategoria=new Subsubcategoria();
    this.consultarCategorias();
    this.consultarSubcategorias();
    this.open(this.modalCrearSubsubcategoria);
  }

  cambioAsignarSubcategoria(){
    if (this.asignarSubcategoria != null){
      this.subcategoriaService.consultarPorCategoria(this.asignarCategoria.id).subscribe(
        res => {
          this.subcategorias = res
        },
        err => {
          Swal.fire(constantes.error, constantes.error_eliminar_categoria, constantes.error_swal)
        }
      );
    }
  }

  validarSesion(){
    this.sesion=this.sesionService.getSesion();
    this.sesionService.validar(this.sesion.id).subscribe(
      res => {
        this.sesion=res;
      },
      err => {
        if(err.error.message==constantes.error_codigo_sesion_invalida){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
        if(err.error.message==constantes.error_codigo_modelo_no_existente){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
      }
    );
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }
}
