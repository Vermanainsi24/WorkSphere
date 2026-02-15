// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { FormsModule } from '@angular/forms';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Add this
// import { MatIconModule } from '@angular/material/icon'; // Add this
// import { ResourceRequestService } from '../../../../core/services/resource-request.service';

// @Component({
//   selector: 'app-admin-requests',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatTableModule,
//     FormsModule,
//     MatProgressSpinnerModule,
//     MatIconModule
//   ],
//   templateUrl: './request-list.html',
//   styleUrls: ['./request-list.css']
// })
// export class RequestListComponent implements OnInit {
//   requests: any[] = [];
//   isLoading: boolean = true; 
//   displayedColumns: string[] = ['employee', 'resource', 'priority', 'date', 'status', 'actions'];

//   constructor(private resourceService: ResourceRequestService) {}

//   ngOnInit(): void {
//     this.loadRequests();
//   }

//   loadRequests(): void {
//     this.isLoading = true; // Show loader
//     this.resourceService.getAllRequests().subscribe({
//       next: (data) => {
//         this.requests = data;
//         this.isLoading = false; // Hide loader
//       },
//       error: (err) => {
//         console.error(err);
//         this.isLoading = false; // Hide loader even on error
//       }
//     });
//   }

//   changeStatus(id: number, newStatus: string) {
//     // Optional: show a small overlay or global loader here if desired
//     this.resourceService.updateStatus(id, newStatus).subscribe({
//       next: () => this.loadRequests(),
//       error: (err) => console.error(err)
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge'; // Add for notification badge
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResourceRequestService } from '../../../../core/services/resource-request.service';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './request-list.html',
  styleUrls: ['./request-list.css']
})
export class RequestListComponent implements OnInit {
  requests: any[] = [];
  isLoading: boolean = true;
  
  // ✅ FIX: Define missing properties used in the template
  statusMessage: string = ''; 
  unreadNotifications: number = 0; 

  displayedColumns: string[] = ['employee', 'resource', 'priority', 'date', 'status', 'actions'];

  constructor(private resourceService: ResourceRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.resourceService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.isLoading = false;
        // Optionally update unread count based on logic
        this.unreadNotifications = data.filter(r => r.status === 'APPLIED').length;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  changeStatus(id: number, newStatus: string) {
    this.resourceService.updateStatus(id, newStatus).subscribe({
      next: () => {
        this.loadRequests();
        // Show success notification
        this.statusMessage = `Request successfully updated to ${newStatus}`;
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => this.statusMessage = '', 3000);
      },
      error: (err) => console.error(err)
    });
  }
}