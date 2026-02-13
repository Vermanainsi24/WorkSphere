import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {

  // Mock Data (replace with API later)
  totalCategories = 5;
  totalResources = 25;
  pendingRequests = 8;
  allocatedResources = 12;

  displayedColumns: string[] = ['employee', 'resource', 'priority', 'date'];

  recentRequests = [
    { employee: 'Aman', resource: 'Laptop', priority: 'HIGH', date: '2026-02-10' },
    { employee: 'Riya', resource: 'Monitor', priority: 'MEDIUM', date: '2026-02-11' },
    { employee: 'Rahul', resource: 'Chair', priority: 'LOW', date: '2026-02-11' }
  ];
}
