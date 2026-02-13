import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent {

  // Mock values (replace with API later)
  totalRequests = 5;
  activeAllocations = 2;
  rejectedRequests = 1;

  displayedColumns: string[] = ['resource', 'status', 'date'];

  recentRequests = [
    { resource: 'Laptop', status: 'ALLOCATED', date: '2026-02-10' },
    { resource: 'Monitor', status: 'APPLIED', date: '2026-02-11' },
    { resource: 'Chair', status: 'REJECTED', date: '2026-02-12' }
  ];
}
