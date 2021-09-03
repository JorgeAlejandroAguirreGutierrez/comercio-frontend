import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarProductoComponent } from './detallar-producto.component';

describe('DetallarProductoComponent', () => {
  let component: DetallarProductoComponent;
  let fixture: ComponentFixture<DetallarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
