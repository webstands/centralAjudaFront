import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioComponent } from '../home/usuario/usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleValues } from 'src/app/shared/model/RoleValues';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const result = await this.authService.login(this.loginForm.value);
      console.log(`Login efetuado: ${result}`);

      this.toastr.success('Login efetuado com sucesso!', 'Sucesso');

      this.router.navigate(['']);
    } catch (error) {
      console.error(error);

      this.toastr.error('Falha ao fazer login. Verifique suas credenciais.', 'Erro');
    }
  }

  adicionarUsuario() {
    const dialogRef = this.dialog.open(UsuarioComponent, {
        width: '400px', 
        data: { role: 'USUARIO', newUser: true, isAdmin: false  } 
    });

    dialogRef.afterClosed().subscribe({
      next: async (result) => {
        console.log(result)
        if (result && result.username && result.password) {
          try {
            await this.authService.login({ username: result.username, password: result.password });

            this.toastr.success('Login efetuado com sucesso!', 'Sucesso');

            this.router.navigate(['']);
          } catch (error) {
            this.toastr.error('Erro ao fazer login', 'Erro');
          }
        }
      },
    });
  }



}
