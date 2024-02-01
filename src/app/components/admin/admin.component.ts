import { Component } from '@angular/core';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  ChartTypeRegistry,
} from 'chart.js';

// Import the Angular core and OnInit

// Register the modules
Chart.register(DoughnutController, ArcElement, Legend, Title);
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  doughnutChartData: number[] = [30, 50, 20];
  doughnutChartLabels: string[] = ['Red', 'Blue', 'Yellow'];
  doughnutChartType: keyof ChartTypeRegistry = 'doughnut'; // Explicitly specify the type
  // Other chart options
  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doughnut Chart Example',
      },
    },
  };

  // Chart type

  constructor() {}

  ngOnInit(): void {
    // You can initialize the chart here
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: this.doughnutChartType,
      data: {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: this.doughnutChartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
            ],
          },
        ],
      },
      options: this.doughnutChartOptions,
    });
  }
}
