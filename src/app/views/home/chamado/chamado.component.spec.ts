import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChamadoComponent } from './chamado.component';


describe('EmpAddEditComponent', () => {
  let component: ChamadoComponent;
  let fixture: ComponentFixture<ChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
