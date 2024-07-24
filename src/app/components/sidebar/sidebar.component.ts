import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
 
})
export class SidebarComponent {
  // isAdmin = false;
  // user = JSON.parse(localStorage.getItem('userDetails') as string);
  // constructor() {
  //   this.checkUserRole();
  // }
  // checkUserRole() {
  //   this.isAdmin = this.user.UserAdmin;
  // }
}
