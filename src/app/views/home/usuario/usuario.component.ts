import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { RoleValues } from 'src/app/shared/model/RoleValues';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],

})
export class UsuarioComponent implements OnInit {
  userForm: FormGroup;

  roles = Object.values(RoleValues);

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      permissao:  ''
    });
  }

  ngOnInit(): void {
   
    if(this.data.user){
      this.userForm.patchValue(this.data.user);
      this.userForm.patchValue({ permissao: this.data.user.roles[0].name });
    }
    
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
        this.toastr.error('As senhas não coincidem', 'Erro');
        return;
      }

      if(this.data.newUser){
        this.userForm.patchValue({ permissao: RoleValues.USUARIO });
      }
     
      if (this.data.user && this.data.user.id) {
        console.log('XXXXXXXXXXxxxxxx')
        this.usuarioService
          .atualizarUsuario(this.data.user.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Usuário atualizado com sucesso!', 'Sucesso');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message, 'Erro');
            },
          });
      } else {
        this.usuarioService.adicionarUsuario(this.userForm.value).subscribe({
          next: (val: any) => {
            if(this.data.newUser){
              this.toastr.success('Usuário adicionado com sucesso!', 'Sucesso');

              const username = this.userForm.get('username')?.value;
              const password = this.userForm.get('password')?.value;
    
              // Fechando o modal e retornando username e password
              this.dialogRef.close({ username, password });
            }
           
          },
          error: (err: any) => {
            this.toastr.error(err.error.message, 'Erro');
          },
        });
      }
    }
  }
}
