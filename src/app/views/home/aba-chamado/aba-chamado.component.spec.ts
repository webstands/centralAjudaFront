import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbaChamadoComponent } from './aba-chamado.component';


describe('TabUserComponent', () => {
  let component: AbaChamadoComponent;
  let fixture: ComponentFixture<AbaChamadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbaChamadoComponent]
    });
    fixture = TestBed.createComponent(AbaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
