import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbaUsuarioComponent } from './aba-usuario.component';


describe('TabUserComponent', () => {
  let component: AbaUsuarioComponent;
  let fixture: ComponentFixture<AbaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbaUsuarioComponent]
    });
    fixture = TestBed.createComponent(AbaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
