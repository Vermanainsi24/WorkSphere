import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  notificationId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getAdminNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/admin`);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
  // ✅ ADD THIS METHOD
  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/read`, {});
  }
   getMyNotifications() {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }
}
