import { Component } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { DashBoardAdminService } from '../dash-board-admin.service';

@Component({
  selector: 'app-category-analytic',
  templateUrl: './category-analytic.component.html',
  styleUrl: './category-analytic.component.css',
})
export class CategoryAnalyticComponent {
  data: number[] = [];
  label: string[] = [];
  listCate: any;
  constructor(private analytic: DashBoardAdminService) {}

  ngOnInit(): void {
    this.Render();
  }
  async Render() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    this.listCate = await this.analytic.AmountProductInCate();
    console.log(this.listCate);

    this.listCate.forEach((res: any) => {
      this.data.push(res.amount);
      this.label.push(res.name);
    });
    const backgroundColors = Array.from({ length: this.data.length }, () =>
      this.getRandomColor()
    );

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [
          {
            data: this.data,
            backgroundColor: backgroundColors,
            hoverOffset: 3,
          },
        ],
      },
      options: {
        interaction: {
          mode: 'index',
        },
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Biểu đồ sản phẩm trong danh mục',
          },
          tooltip: {
            usePointStyle: true,
          },
        },
      },
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
