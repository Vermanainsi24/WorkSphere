import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayoutComponent implements OnInit {

  unreadNotifications = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadUnreadNotifications();
  }

  loadUnreadNotifications() {
    this.notificationService.getMyNotifications()
      .subscribe({
        next: (notifications) => {
          this.unreadNotifications =
            notifications.filter(n => !n.isRead).length;
        },
        error: (err) => {
          console.error('Failed to load notifications', err);
        }
      });
  }
}
