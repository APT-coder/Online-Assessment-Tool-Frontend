import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-table-styled',
  standalone: true,
  imports: [MatTableModule,NgFor],
  templateUrl: './table-styled.component.html',
  styleUrl: './table-styled.component.scss'
})
export class TableStyledComponent {
  rows = [
    { no:1, content: 'Row 1 content', Assessment:'OOP'},
    { no:2, content: 'Row 2 content', Assessment:'OOP'},
    { no:3, content: 'Row 3 content', Assessment:'OOP'},
    // Add more rows as needed
  ];
}
