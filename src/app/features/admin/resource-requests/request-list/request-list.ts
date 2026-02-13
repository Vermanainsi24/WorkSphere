import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './request-list.html',
  styleUrls: ['./request-list.css']
})
export class RequestListComponent {

  displayedColumns: string[] = [
    'employee',
    'resource',
    'priority',
    'date',
    'status',
    'actions'
  ];

  // Mock data (replace with API later)
  requests = [
    {
      employee: 'Aman',
      resource: 'Laptop',
      priority: 'HIGH',
      date: new Date('2026-02-10'),
      status: 'APPLIED'
    },
    {
      employee: 'Riya',
      resource: 'Monitor',
      priority: 'MEDIUM',
      date: new Date('2026-02-11'),
      status: 'APPLIED'
    },
    {
      employee: 'Rahul',
      resource: 'Chair',
      priority: 'LOW',
      date: new Date('2026-02-12'),
      status: 'APPLIED'
    }
  ];

  approve(request: any) {
    request.status = 'ALLOCATED';
  }

  reject(request: any) {
    request.status = 'REJECTED';
  }

}
