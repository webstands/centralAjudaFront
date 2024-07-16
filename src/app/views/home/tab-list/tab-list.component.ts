import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.css']
})
export class TabListComponent {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserScopeFromToken();
  }

  isUserAdmin(): boolean {
    const userScope = this.authService.getUserScope();
    return userScope === 'ADMIN';
  }

  isUserGerenciador(): boolean {
    const userScope = this.authService.getUserScope();
    return userScope === 'GERENCIADOR';
  }
}
