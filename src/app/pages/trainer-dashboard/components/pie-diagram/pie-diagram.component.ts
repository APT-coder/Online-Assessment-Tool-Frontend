import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-pie-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './pie-diagram.component.html',
  styleUrl: './pie-diagram.component.scss'
})
export class PieDiagramComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
          datasets: [
              {
                  data: [3, 2, 35],
                  backgroundColor: ['#F3F0FC', '#E3DAF8', '#5940B7'],
                  hoverBackgroundColor: ['#f5f3f9', '#e6e1f2', '#443388']
                  
              }
          ]
      };

      this.options = {
        responsive: true,
      aspectRatio: 1.5, 
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };
  }
}
