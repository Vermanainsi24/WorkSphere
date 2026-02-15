import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ResourceRequestService } from '../../../../core/services/resource-request.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    MatIcon
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  requests: any[] = [];

  totalRequests = 0;
  pendingCount = 0;
  allocatedCount = 0;
  returnedCount = 0;
  awaitedCount = 0;

  constructor(private resourceService: ResourceRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  /* ================= LOAD DATA ================= */

  loadRequests(): void {
    this.resourceService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;

        this.totalRequests = data.length;
        this.pendingCount = data.filter(r => r.status === 'APPLIED').length;
        this.allocatedCount = data.filter(r => r.status === 'ALLOCATED').length;
        this.returnedCount = data.filter(r => r.status === 'RETURNED').length;
        this.awaitedCount = data.filter(r => r.status === 'AWAITED').length;

        this.updatePieChart();
        this.generateTrendChart(data);
      },
      error: (err) => console.error(err)
    });
  }

  /* ================= PIE CHART ================= */

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Applied', 'Allocated', 'Returned','Awaited'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#fbbf24', '#22c55e', '#60a5fa']
      }
    ]
  };

  // pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom'
  //     }
  //   }
  // };
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 14,
        padding: 12,
        font: {
          size: 12
        }
      }
    }
  }
};


  updatePieChart() {
    this.pieChartData = {
      labels: ['Applied', 'Allocated', 'Returned','Awaited'],
      datasets: [
        {
          data: [
            this.pendingCount,
            this.allocatedCount,
            this.returnedCount,
            this.awaitedCount
          ],
          backgroundColor: ['#fbbf24', '#22c55e', '#60a5fa','yellow']
        }
      ]
    };
  }

  /* ================= LINE CHART ================= */

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Requests',
        fill: true,
        tension: 0.4,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.15)'
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  generateTrendChart(data: any[]) {

    const dateMap: { [key: string]: number } = {};

    data.forEach(req => {
      if (!req.requestDate) return;

      const date = req.requestDate.split('T')[0];

      if (dateMap[date]) {
        dateMap[date]++;
      } else {
        dateMap[date] = 1;
      }
    });

    const sortedDates = Object.keys(dateMap).sort();

    this.lineChartData = {
      labels: sortedDates,
      datasets: [
        {
          data: sortedDates.map(date => dateMap[date]),
          label: 'Requests',
          fill: true,
          tension: 0.4,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.15)'
        }
      ]
    };
  }

}
