import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceRequestService {

  // private apiUrl = '';

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/resource-request';
    getAllResources() {
      return this.http.get<any[]>(
        'http://localhost:8080/api/resources/all'
      );
    }

    createRequest(payload: any) {
      return this.http.post(
        'http://localhost:8080/api/resource-request/create',
        payload
      );
    }
    getAllRequests() {
  return this.http.get<any[]>(
    'http://localhost:8080/api/resource-request/admin/all'
  );
}
//   updateStatus(id: number, status: string) {
//   return this.http.put(
//     `http://localhost:8080/api/resource-request/update-status/${id}?status=${status}`,
//     {}
//   );
// }
updateStatus(id: number, status: string) {
  return this.http.put(
    `${this.baseUrl}/update-status/${id}?status=${status}`,
    {},
    { responseType: 'text' }  // 👈 VERY IMPORTANT
  );
}
getEmployeeKpi() {
  return this.http.get<any>(
    'http://localhost:8080/api/resource-request/employee/kpi'
  );
}

getMyRequests() {
  return this.http.get<any[]>(
    'http://localhost:8080/api/resource-request/employee/my'
  );
}




}
