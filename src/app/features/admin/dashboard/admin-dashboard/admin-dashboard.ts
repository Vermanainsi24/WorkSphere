import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { ResourceRequestService } from '../../../../core/services/resource-request.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    FormsModule   // IMPORTANT
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  requests: any[] = [];
  displayedColumns: string[] = ['employee', 'resource', 'priority', 'date','actions'];

  totalRequests = 0;
  pendingCount = 0;
  allocatedCount = 0;
  returnedCount = 0;

  ngOnInit() {
    this.loadRequests();
  }

 


  constructor(private resourceService: ResourceRequestService) {}

  // ngOnInit(): void {
  //   this.loadRequests();
  // }

  // loadRequests(): void {
  //   this.resourceService.getAllRequests()
  //     .subscribe({
  //       next: (data) => {
  //         this.requests = data;
  //       },
  //       error: (err) => {
  //         console.error('Failed to load requests', err);
  //       }
  //     });
  // }
   loadRequests() {
    this.resourceService.getAllRequests()
      .subscribe({
        next: (data) => {
          this.requests = data;

          // ✅ Calculate KPI values here
          this.totalRequests = this.requests.length;
          this.pendingCount = this.requests.filter(r => r.status === 'APPLIED').length;
          this.allocatedCount = this.requests.filter(r => r.status === 'ALLOCATED').length;
          this.returnedCount = this.requests.filter(r => r.status === 'RETURNED').length;
        },
        error: (err) => {
          console.error('Failed to load requests', err);
        }
      });
  }
changeStatus(id: number, newStatus: string) {

  this.resourceService.updateStatus(id, newStatus)
    .subscribe({
      next: () => {
        this.loadRequests();   // refresh table
      },
      error: (err) => {
        console.error('Status update failed', err);
      }
    });
}


}
