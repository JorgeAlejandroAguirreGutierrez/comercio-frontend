import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerProductoComponent } from './leer-producto.component';

describe('LeerProductoComponent', () => {
  let component: LeerProductoComponent;
  let fixture: ComponentFixture<LeerProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
