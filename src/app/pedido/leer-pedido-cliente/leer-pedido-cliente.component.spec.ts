import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerPedidoClienteComponent } from './leer-pedido-cliente.component';

describe('LeerPedidoClienteComponent', () => {
  let component: LeerPedidoClienteComponent;
  let fixture: ComponentFixture<LeerPedidoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerPedidoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
