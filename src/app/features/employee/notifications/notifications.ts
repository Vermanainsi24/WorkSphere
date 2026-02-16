import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-notification',
  imports :[DatePipe,CommonModule,MatProgressSpinnerModule,MatIcon],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  isLoading = false;

  constructor(private notificationService: NotificationService) {}
  ngOnInit() {
  this.loadNotifications();

  setInterval(() => {
    this.loadNotifications();
  }, 10000);
}


  loadNotifications(): void {
    this.isLoading = true;

    this.notificationService.getMyNotifications()
      .subscribe({
        next: (data) => {
          this.notifications = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load notifications', err);
          this.isLoading = false;
        }
      });
  }
}
