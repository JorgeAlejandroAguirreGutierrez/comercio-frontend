import { Component, OnInit } from '@angular/core';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { Sesion } from '../modelos/sesion';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  tienda=environment.tienda;
  prefijoUrlImg = environment.prefijo_url_img;
  prefijoUrlImgFront = environment.prefijo_url_imgfront;
  sesion: Sesion=new Sesion();
  identificacion: string="";
  contrasena: string="";

  constructor(private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.sesion.usuario.identificacion=this.identificacion;
    this.sesion.usuario.contrasena=this.contrasena;
    console.log(this.sesion);
    this.sesionService.crear(this.sesion).subscribe(
      res => {
        this.sesion=res;
        this.sesionService.setSesion(this.sesion);
        Swal.fire(constantes.exito, constantes.exito_iniciar_sesion, constantes.exito_swal);
        this.navegarExitoso();
      },
      error => Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal)
    );
  }

  navegarExitoso() {
    this.router.navigate(['/crear-producto']);
  }
  navegarIndex() {
    this.router.navigate(['/index']);
  }
}
