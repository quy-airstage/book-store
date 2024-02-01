import { Component } from '@angular/core';
import { DashBoardAdminService } from '../dash-board-admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-product-analytic',
  templateUrl: './product-analytic.component.html',
  styleUrl: './product-analytic.component.css',
})
export class ProductAnalyticComponent {
  data: number[] = [];
  name = '';
  label: string[] = [];
  listPro: any;

  constructor(private analytic: DashBoardAdminService) {}

  async ngOnInit() {
    this.listPro = await this.analytic.ViewProduct();
    console.log(this.listPro);
    this.listPro.forEach((res: any, i: number) => {
      if (i > 5) {
        return;
      }
      this.data.push(res.view);
      this.label.push(res.id);
    });
    this.name = 'Xem nhiều';
    this.Render();
  }

  async Render() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: this.name,
            data: this.data,
            borderColor: '#fb6565',
            backgroundColor: '#fb6565',
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Biểu đồ sản phẩm sắp xếp: ' + this.name,
          },
        },
      },
    });
  }
  async viewSet() {
    this.listPro = await this.analytic.ViewProduct();
    console.log(this.listPro);
    this.data = [];
    this.label = [];
    this.listPro.forEach((res: any, i: number) => {
      if (i > 5) {
        return;
      }
      this.data.push(res.view);
      this.label.push(res.id);
    });
    this.name = 'Xem nhiều';
    this.Render();
  }
  async soldSet() {
    this.listPro = await this.analytic.SoldProduct();
    console.log(this.listPro);
    this.data = [];
    this.label = [];
    this.listPro.forEach((res: any, i: number) => {
      if (i > 5) {
        return;
      }
      this.data.push(res.sold);
      this.label.push(res.id);
    });
    this.name = 'Mua nhiều';
    this.Render();
  }
}
