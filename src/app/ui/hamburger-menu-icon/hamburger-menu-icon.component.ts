import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger-menu-icon.component.html',
  styleUrl: './hamburger-menu-icon.component.scss'
})
export class HamburgerMenuIconComponent {
  isMenuOpen = true;

  @Output() menuOpen = new EventEmitter<boolean>();

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuOpen.emit(this.isMenuOpen);
  }
}
