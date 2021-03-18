import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerPedidoComponent } from './leer-pedido.component';

describe('LeerPedidoComponent', () => {
  let component: LeerPedidoComponent;
  let fixture: ComponentFixture<LeerPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
