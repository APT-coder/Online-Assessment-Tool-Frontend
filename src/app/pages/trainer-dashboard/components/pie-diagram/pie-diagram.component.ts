import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TrainerDashboardService } from '../../../../service/trainer-dashboard/trainer-dashboard.service';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-diagram',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './pie-diagram.component.html',
  styleUrl: './pie-diagram.component.scss'
})
export class PieDiagramComponent implements OnInit, OnChanges {
    @Input() assessmentId!: number;
    data: any;
    options: any;
  
    constructor(private dashboardService: TrainerDashboardService) {}
  
    ngOnInit() {
      this.initializeChart();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['assessmentId'] && this.assessmentId) {
        this.fetchTraineeAssessmentDetails();
      }
    }
  
    initializeChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  
      this.options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      };
    }
  
    fetchTraineeAssessmentDetails() {
        this.dashboardService.getTraineeAssessmentDetails(this.assessmentId).subscribe((data: any) => {
          console.log('API Response Data:', data);
      
          // Calculate present and absent counts with correct casing
          const presentCount = data.filter((item: any) => item.isPresent === 'Completed').length;
          const absentCount = data.filter((item: any) => item.isPresent === 'Absent').length;
      
          // Log counts to the console
          console.log('Present Count:', presentCount);
          console.log('Absent Count:', absentCount);
      
          // Set data for pie chart
          this.data = {
            labels: ['Present', 'Absent'],
            datasets: [{
              data: [presentCount, absentCount],
              backgroundColor: ['#42A5F5', '#FF7043']
            }]
          };
        }, error => {
          console.error('Error fetching trainee assessment details:', error);
        });
      }
      
  }
