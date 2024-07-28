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

        if (chartResult.length === 0) {
          console.error('No data available for chart');
          return;
        }

        const totalScore = chartResult[0].totalScore || 100; // Default to 100 if totalScore is null or undefined
        const ranges = this.getScoreRanges(totalScore);
        const scoreCategories = this.initializeScoreCategories(ranges);

        chartResult.forEach(item => {
          const averageScore = item.avergeScore;
          const range = ranges.find(range => averageScore >= range.min && averageScore < range.max);
          if (range) {
            scoreCategories[range.label]++;
          } else {
            scoreCategories[`Below ${ranges[ranges.length - 1].min}`]++;
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

 
  getScoreRanges(totalScore: number): Array<{ label: string, min: number, max: number }> {
    const ranges = [];
    const rangeSize = 10; 

    for (let max = totalScore; max > 0; max -= rangeSize) {
      const min = Math.max(max - rangeSize, 0);
      ranges.push({ label: `${min}-${max}`, min, max });
    }

    if (ranges.length > 5) {
      const belowMin = ranges[4].min;
      ranges.splice(4, ranges.length - 4, { label: `Below ${belowMin}`, min: 0, max: belowMin });
    }

    return ranges;
  }



  initializeScoreCategories(ranges: Array<{ label: string, min: number, max: number }>): { [key: string]: number } {
    const scoreCategories: { [key: string]: number } = {};
    ranges.forEach(range => {
      scoreCategories[range.label] = 0;
    });
    return scoreCategories;
  }
}