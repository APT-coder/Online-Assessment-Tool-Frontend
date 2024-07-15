import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-instruction-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './instruction-page.component.html',
  styleUrl: './instruction-page.component.scss'
})
export class InstructionPageComponent {

  constructor(private router: Router) { }

  startTest() {
    this.router.navigate(['/test']);
  }

}
