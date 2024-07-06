import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import '@fortawesome/fontawesome-free/css/all.css';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';


@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonActiveComponent]
})
export class ProfileModalComponent implements OnInit {
  hoveredRow: number | null = null;
  profileImage: string = "https://i.pravatar.cc/100";

  profileDetails = [
    { label: 'Name:', value: 'Your Name' },
    { label: 'Username:', value: 'Your Username' },
    { label: 'Email:', value: 'your.email@example.com' },
    { label: 'Phone:', value: '(123) 456-7890' }
  ];
  elementRef: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  closeModal() {
    const modal = this.elementRef.nativeElement.querySelector('.profile-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openFileExplorer() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file.name);
      }
    };
  }
}
