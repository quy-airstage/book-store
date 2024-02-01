import { Component } from '@angular/core';
import { DashBoardAdminService } from '../dash-board-admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bill-analytic',
  templateUrl: './bill-analytic.component.html',
  styleUrl: './bill-analytic.component.css',
})
export class BillAnalyticComponent {
  data: number[] = [];
  name = '';
  label: string[] = [];
  listBill: any;

  constructor(private analytic: DashBoardAdminService) {}

  async ngOnInit() {
    this.listBill = await this.analytic.AllBillRevenue();
    console.log(this.listBill);
    this.listBill.forEach((res: any, i: number) => {
      this.data.push(res.total);
      this.label.push(res.name);
    });
    this.name = 'Doanh thu';
    this.Render();
  }

  async Render() {
    const ctx = document.getElementById('lineChartBill') as HTMLCanvasElement;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.label,
        datasets: [
          {
            label: this.name,
            data: this.data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Biểu đồ doanh thu',
          },
        },
      },
    });
  }
}
