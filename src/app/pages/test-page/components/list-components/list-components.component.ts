import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-list-components',
    standalone: true,
    templateUrl: './list-components.component.html',
    styleUrl: './list-components.component.scss',
    imports: [CommonModule,FormsModule]
})
export class ListComponentsComponent {

    @Input() questions:any;
    @Input() questionType:any;
    inputValue: string = '';

  
}
