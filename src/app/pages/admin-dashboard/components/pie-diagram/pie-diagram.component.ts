import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AdminChart } from '../../../../../models/adminChart.interface'; 
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service'; 
import { ApiResponses } from '../../../../../models/apiResponse.interface'; 
import { AdminChartResponse } from '../../../../../models/adminChartResponse.interface'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-diagram',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './pie-diagram.component.html',
  styleUrl: './pie-diagram.component.scss'
})
export class PieDiagramComponent {
    @Input() assessmentId!: number;
    data: any;
    options: any;
  
    constructor(private chartService: AdminDashboardService) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['assessmentId'] && this.assessmentId) {
        this.updateChart();
      }
    }
  
    updateChart(): void {
      this.chartService.getChartValues(this.assessmentId).subscribe((chartData: AdminChartResponse) => {
        const chartResult = chartData.result;
        const scoreCategories = {
          '80-90': 0,
          '60-70': 0,
          '70-80': 0,
          '>90': 0,
          'Below 60': 0
        };
  
        chartResult.forEach(item => {
          if (item.avergeScore > 90) {
            scoreCategories['>90']++;
          } else if (item.avergeScore >= 80) {
            scoreCategories['80-90']++;
          } else if (item.avergeScore >= 70) {
            scoreCategories['70-80']++;
          } else if (item.avergeScore >= 60) {
            scoreCategories['60-70']++;
          } else {
            scoreCategories['Below 60']++;
          }
        });
  
        this.data = {
          datasets: [
            {
              data: Object.values(scoreCategories),
              backgroundColor: ['#D682C4', '#F1D0D0', '#D2A4BF', '#D682C4', '#9D4999'],
              hoverBackgroundColor: ['#ed92d9', '#f3d9d9', '#d2abc1', '#c579b4', '#ab54a7']
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
                color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
              }
            }
          }
        };
      });
    }
}
