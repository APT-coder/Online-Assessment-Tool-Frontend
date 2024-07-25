import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from "../../ui/buttons/button/button.component";

@Component({
  selector: 'app-instruction-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './instruction-page.component.html',
  styleUrl: './instruction-page.component.scss'
})
export class InstructionPageComponent {

  constructor(private router: Router,private route: ActivatedRoute) { }


  assessmentId:any;

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id');
  }
}
