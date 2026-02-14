import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceRequestService {

  // private apiUrl = '';

  constructor(private http: HttpClient) {}

  // private baseUrl = 'http://localhost:8080/api/resource-request';
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


}
