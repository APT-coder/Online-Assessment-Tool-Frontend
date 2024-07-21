import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { ApiEndpointService } from '../../service/api-service/api-endpoint.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() userId: number = 1;
  userDetail = {name: '', image: '', role: '', course: '' };

  @Output() cardClicked = new EventEmitter<void>();
  constructor(private userService: UserService, private apiEndpointService: ApiEndpointService) {
    this.apiEndpointService.loadEndpoints().subscribe();
  }

  ngOninit() {
    this.fetchDetails();
  }
  onCardClick() {
    this.cardClicked.emit();
  }

  fetchDetails() {
    this.userService.getUserById(this.userId).subscribe((response: any) => {
      console.log(response);
      
    }, (error: any) => {
      console.error('Error fetching user', error);
    });
  }

}
