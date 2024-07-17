import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-pie-diagram',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './pie-diagram.component.html',
  styleUrl: './pie-diagram.component.scss'
})
export class PieDiagramComponent {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
          // labels: ['A', 'B', 'C','D','E'],
          datasets: [
              {
                  data: [25, 20, 14, 8, 3],
                  backgroundColor: ['#D682C4', '#F1D0D0', '#D2A4BF','#D682C4','#9D4999'],
                  hoverBackgroundColor: ['#ed92d9', '#f3d9d9', '#d2abc1','#c579b4','#ab54a7']
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
