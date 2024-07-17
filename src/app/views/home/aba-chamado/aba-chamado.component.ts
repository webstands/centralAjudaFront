import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ChamadoService } from 'src/app/shared/service/chamado.service';
import { ChamadoComponent } from '../chamado/chamado.component';
import { MessageService } from 'src/app/shared/service/MessageService';

@Component({
  selector: 'aba-chamado',
  templateUrl: './aba-chamado.component.html',
  styleUrls: ['./aba-chamado.component.css']
})
export class AbaChamadoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'subject',
    'description',
    'createdAt',
    'closedAt',
    'userId',
    'closedById',
    'rating',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private chamadoService: ChamadoService,
    private toastr: ToastrService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.loadUserScopeFromToken();
    this.authService.loadUserIdFromToken();
    if(!this.isUser()){
      this.getListaChamadoTodos();   
    }else{
      this.getListaChamado();   
    }
   

    // Inicia o polling de mensagens
    this.messageService.pollMessages().subscribe({
      next: (message) => {
        console.log(message);
        if (this.isUserGerenciador() && message !== "No messages in the queue") {
          this.toastr.info('Novo chamado adicionado', 'Notificação');
          this.getListaChamadoTodos();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar mensagens', err);
      }
    });
  }

  isUserAdmin(): boolean {
    const userScope = this.authService.getUserScope();
    return userScope === 'ADMIN';
  }

  isUserGerenciador(): boolean {
    const userScope = this.authService.getUserScope();
    return userScope === 'GERENCIADOR';
  }

  isUser(): boolean {
    const userScope = this.authService.getUserScope();
    return userScope === 'USUARIO';
  }

  adicionarUsuario() {
    const dialogRef = this.dialog.open(ChamadoComponent, {
      width: '480px', 
      data: {new: true, userId: this.authService.getUserId() } 
   });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListaChamado();
        }
      },
    });
  }

  getListaChamado() {
    this.chamadoService.getListaChamado( this.authService.getUserId()).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getListaChamadoTodos() {
    this.chamadoService.getListaChamadoTodos().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editarChamado(data: any) {
    
    const dialogRef = this.dialog.open(ChamadoComponent, {
      width: '480px', 
      data: { role: 'USUARIO', new: false, isAdmin: true, chamado: data } 
     });


    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListaChamado();
        }
      },
    });
  }

  deletarChamado(id: number) {
    this.chamadoService.deletarChamado(id).subscribe({
      next: (res) => {
        this.toastr.success('Chamado deletado com sucesso!', 'Sucesso');
        if(this.isUser()){
          this.getListaChamado();
        }else{
          this.getListaChamadoTodos();
        }
        
      },
      error: (err) => {
        this.toastr.error('Erro ao deletar usuário', 'Erro');
        console.log(err);
      },
    });
  }
}
