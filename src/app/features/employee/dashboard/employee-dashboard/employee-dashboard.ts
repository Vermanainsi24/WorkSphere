import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, Chart } from 'chart.js';
import { ResourceRequestService } from '../../../../core/services/resource-request.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, BaseChartDirective],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  totalRequests = 0;
  rejectedRequests = 0;
  activeAllocations = 0;

  constructor(private requestService: ResourceRequestService) {}

  // =========================
  // 📊 BAR CHART (Updated for "Realistic" Look)
  // =========================
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Pending', 'Approved', 'Awaited'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#fbbf24', '#10b981', '#ef4444'], // Yellow, Green, Red
      borderRadius: 12, // Modern rounded bars
      barThickness: 40
    }]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false } // Cleaner look
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  // =========================
  // 📈 LINE CHART (Updated with Area Gradient)
  // =========================
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Monthly Requests',
      borderColor: '#6366f1', // Indigo Line
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      fill: 'start', // Enables Area Fill
      tension: 0.4,  // Smooth curvy line
      backgroundColor: (context) => {
        const canvas = context.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)'); // Indigo tint
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');   // Transparent fade
        return gradient;
      }
    }]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end' }
    },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  ngOnInit(): void {
    this.loadKpi();
    this.loadRequestStats();
    this.loadMonthlyTrend();
  }

  loadKpi() {
    this.requestService.getEmployeeKpi().subscribe({
      next: (data) => {
        this.totalRequests = data.totalRequests;
        this.activeAllocations = data.activeAllocations;
        this.rejectedRequests = data.rejectedRequests;
      },
      error: (err) => console.error('Failed to load KPI', err)
    });
  }

  loadRequestStats() {
    this.requestService.getMyRequests().subscribe(data => {
      const pending = data.filter(r => r.status === 'APPLIED').length;
      const approved = data.filter(r => r.status === 'ALLOCATED').length;
      const rejected = data.filter(r => r.status === 'REJECTED').length;

      this.barChartData.datasets[0].data = [pending, approved, rejected];
      this.chart?.update();
    });
  }

  loadMonthlyTrend() {
    this.requestService.getMyRequests().subscribe(data => {
      const monthMap: { [key: string]: number } = {};
      data.sort((a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime())
          .forEach(r => {
            const month = new Date(r.requestDate).toLocaleString('default', { month: 'short' });
            monthMap[month] = (monthMap[month] || 0) + 1;
          });

      this.lineChartData.labels = Object.keys(monthMap);
      this.lineChartData.datasets[0].data = Object.values(monthMap);
      this.chart?.update();
    });
  }
}