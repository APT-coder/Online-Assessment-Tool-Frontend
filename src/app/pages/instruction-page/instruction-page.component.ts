import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from "../../ui/buttons/button/button.component";
import { TimeFormatPipe } from "../../pipes/timeFormat/timeformat.pipe";

@Component({
  selector: 'app-instruction-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TimeFormatPipe],
  templateUrl: './instruction-page.component.html',
  styleUrl: './instruction-page.component.scss'
})
export class InstructionPageComponent {


  data:any;


  constructor(private router: Router,private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.data = navigation.extras.state['data'];
    }
  }
  
onRowClicked() {

  const navigationExtras: NavigationExtras = {
    state: {
      data: this.data
    }
  };

  this.router.navigate(['/test', this.assessmentId],navigationExtras);
}

 
  assessmentId:any;

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id');    
  }
}
