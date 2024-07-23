import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  userDetail = {name: '', image: '', role: '', course: '' };

  user = JSON.parse(localStorage.getItem('userDetails') as string);

  @Output() cardClicked = new EventEmitter<void>();
  constructor() {
    this.fetchDetails();
  }

  ngOninit() {
    this.fetchDetails();
    console.log(this.user);
  }
  onCardClick() {
    this.cardClicked.emit();
  }

  fetchDetails() {
    console.log(this.user);
    this.userDetail.name = this.user.UserName;
    this.userDetail.image = "assets/User.png";
    if(this.user.UserAdmin){
      this.userDetail.role = "Admin";
    }
    else if(this.user.UserType == 1){
      this.userDetail.role = "Trainer";
    }
    else{
      this.userDetail.role = "Trainee";
    }
  }

}
