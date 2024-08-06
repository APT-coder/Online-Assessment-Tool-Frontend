import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TrainerDashboardService } from '../../../../../service/trainer-dashboard/trainer-dashboard.service';


@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss'
})
export class BarGraphComponent implements OnInit,OnChanges{
  @Input() assessmentId!: number;
  basicData: any;
  basicOptions: any;

  constructor(private dashboardService: TrainerDashboardService) {}
  
  ngOnInit() {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['assessmentId'] && this.assessmentId) {
      this.fetchScoreDistribution();
    }
  }

  initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  fetchScoreDistribution() {
    this.dashboardService.getScoreDistribution(this.assessmentId).subscribe(data => {
      const labels = data.map((item: any) => item.category);
      const scores = data.map((item: any) => item.count); 

      this.basicData = {
        labels: labels,
        datasets: [
          {
            label: 'No.of Trainees',
            backgroundColor: '#42A5F5',
            data: scores
          }
        ]
      };
    });
  }
}
