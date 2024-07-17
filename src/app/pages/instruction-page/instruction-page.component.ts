import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from "../../ui/buttons/button/button.component";

@Component({
  selector: 'app-instruction-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './instruction-page.component.html',
  styleUrl: './instruction-page.component.scss'
})
export class InstructionPageComponent {

  constructor(private router: Router) { }

  startTest() {
    this.router.navigate(['/test']);
  }

}
