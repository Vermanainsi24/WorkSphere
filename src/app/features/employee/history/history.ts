import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ResourceRequestService } from '../../../core/services/resource-request.service';

@Component({
  selector: 'app-employee-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = [
    'resource',
    'date',
    'priority',
    'status'
  ];

  dataSource: any[] = [];
  loading = true;

  constructor(private requestService: ResourceRequestService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'ALLOCATED': return 'primary';
      case 'APPLIED': return 'accent';
      case 'REJECTED': return 'warn';
      case 'RETURNED': return '';
      default: return '';
    }
  }
}
