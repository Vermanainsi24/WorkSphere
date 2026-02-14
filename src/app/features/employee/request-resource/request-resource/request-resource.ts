import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResourceRequestService } from '../../../../core/services/resource-request.service';

@Component({
  selector: 'app-request-resource',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  MatProgressSpinnerModule
  ],
  templateUrl: './request-resource.html',
  styleUrls: ['./request-resource.css']
})
export class RequestResourceComponent implements OnInit {

  isSubmitting = false;
  isLoadingResources = false;

  // Request model
  request = {
    resourceId: null as number | null,
    priority: '',
    description: ''
  };

  // Resources fetched from backend
  resources: any[] = [];

  constructor(
    private requestService: ResourceRequestService,
    private snackBar: MatSnackBar
  ) {}

  // ========================================
  // INIT
  // ========================================
  ngOnInit(): void {
    this.loadResources();
  }

  // ========================================
  // LOAD RESOURCES FROM BACKEND
  // ========================================
  loadResources(): void {

    this.isLoadingResources = true;

    this.requestService.getAllResources()
      .subscribe({
        next: (data) => {
          this.resources = data;
          this.isLoadingResources = false;
        },
        error: (err) => {
          console.error('Failed to load resources', err);

          this.snackBar.open(
            'Failed to load resources',
            'Close',
            { duration: 3000 }
          );

          this.isLoadingResources = false;
        }
      });
  }

  // ========================================
  // SUBMIT REQUEST
  // ========================================
  submitRequest(): void {

    if (this.isSubmitting) return;

    // Basic validation
    if (!this.request.resourceId || !this.request.priority) {
      this.snackBar.open(
        'Please select resource and priority',
        'Close',
        { duration: 3000 }
      );
      return;
    }

    this.isSubmitting = true;

    const payload = {
      resourceId: this.request.resourceId,
      description: this.request.description,
      priority: this.request.priority
    };

    this.requestService.createRequest(payload)
      .subscribe({
        next: () => {

          this.snackBar.open(
            'Request submitted successfully!',
            'Close',
            { duration: 3000 }
          );

          // Reset form
          this.request = {
            resourceId: null,
            priority: '',
            description: ''
          };

          this.isSubmitting = false;
        },
        error: (err) => {

          console.error('Request submission failed', err);

          this.snackBar.open(
            'Failed to submit request',
            'Close',
            { duration: 3000 }
          );

          this.isSubmitting = false;
        }
      });
  }
}
