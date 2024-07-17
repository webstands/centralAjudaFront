import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { RoleValues } from 'src/app/shared/model/RoleValues';
import { ChamadoService } from 'src/app/shared/service/chamado.service';

@Component({
  selector: 'chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.scss'],

})
export class ChamadoComponent implements OnInit {
  callForm: FormGroup;

  roles = Object.values(RoleValues);

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private dialogRef: MatDialogRef<ChamadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.callForm = this.fb.group({
      subject: '',
      description: '',
      userId: this.data.userId,
      id:  this.data.id
    });
  }

  ngOnInit(): void {
  
    if(this.data.chamado){
      this.callForm.patchValue(this.data.chamado);
    }
  }

  onFormSubmit() {
    if (this.callForm.valid) {
      
     
      if (this.data.chamado && this.data.chamado.id) {

        this.chamadoService
          .atualizarChamado(this.callForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Chamado atualizado com sucesso!', 'Sucesso');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message, 'Erro');
            },
          });
      } else {
        this.chamadoService.adicionarChamado(this.callForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Chamado criado com sucesso!', 'Sucesso');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err.error.message, 'Erro');
          },
        });
      }
    }
  }
}
