import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service'; 
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
   
    @Input() assessmentId!: number ;

    data: any;  
    options: any; 
  
    constructor(private chartService: AdminDashboardService) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['assessmentId'] && this.assessmentId !== null) {
        this.updateChart();
      }
    }
  
    updateChart(): void {
      if (this.assessmentId === null) {
        console.log(this.assessmentId);
        return; 
      }
  
      this.chartService.getChartValues(this.assessmentId).subscribe(
        (chartData: AdminChartResponse) => {
          console.log(chartData.result); // For debugging purposes
          const chartResult = chartData.result;
          const scoreCategories = {
            'Above 90': 0,
            '80-90': 0,
            '70-80': 0,
            '60-70': 0,
            'Below 60': 0
          };
  
          chartResult.forEach(item => {
            if (item.avergeScore > 90) {
              scoreCategories['Above 90']++;
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
                backgroundColor: ['#008080', '#87CEEB', '#FFC107', '#FF5722', '#673AB7'],
                hoverBackgroundColor: ['#006666', '#6BB3D6', '#FFB300', '#E64A19', '#5E35B1']
              }
            ],
            labels: Object.keys(scoreCategories),
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
        },
        (error: any) => {
          console.error('Error fetching chart data:', error);
        }
      );
    }
}
