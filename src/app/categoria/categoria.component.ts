import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as constantes from '../constantes';
import * as util from '../util';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  tienda=environment.tienda;
  
  constructor() { }

  ngOnInit(): void {
    util.loadScripts();
  }

}
