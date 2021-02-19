import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { Sesion } from '../modelos/sesion';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  sesion: Sesion=new Sesion();
  identificacion: string="";
  contrasena: string="";

  constructor(private usuarioService: UsuarioService, private sesionService: SesionService, private router: Router) { }

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
