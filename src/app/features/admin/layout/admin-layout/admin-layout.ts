import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';   // 👈 ADD THIS

import { NotificationService, Notification } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatMenuModule,CommonModule
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit {

  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();

    setInterval(() => {
    this.loadNotifications();
  }, 10000);
  }
 

  loadNotifications() {
    this.notificationService.getAdminNotifications()
      .subscribe(data => {
        this.notifications = data;
        this.unreadCount = this.notifications.filter(n => !n.isRead).length;
      });
  }

  // Cleaner unread count getter
  get unreadNotifications(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  

}
