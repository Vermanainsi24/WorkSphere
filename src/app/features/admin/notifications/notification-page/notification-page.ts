import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService, Notification } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './notification-page.html',
  styleUrls: ['./notification-page.css']
})
export class NotificationPageComponent implements OnInit {

  notifications: Notification[] = [];

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
      });
  }

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification.notificationId)
      .subscribe(() => {
        notification.isRead = true;
      });
  }
}
