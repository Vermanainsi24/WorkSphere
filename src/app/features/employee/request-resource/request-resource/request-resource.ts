import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ResourceRequestService } from '../../../../core/services/resource-request.service'; // ✅ ADD THIS

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
    MatIcon,
    MatSnackBarModule
  ],
  templateUrl: './request-resource.html',
  styleUrls: ['./request-resource.css']
})
export class RequestResourceComponent {

  
  isSubmitting = false;

  request = {
  resourceId: 0,
  priority: '',
  description: ''
};


  resources = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Monitor' }
];

  constructor(
    private requestService: ResourceRequestService,
    private resourceService: ResourceRequestService,
    private snackBar: MatSnackBar
  ) {}

  // ngOnInit() {
  //   this.loadResources();
  // }

  // loadResources() {
  //   this.resourceService.getAvailableResources()
  //     .subscribe(res => {
  //       this.resources = res;
  //     });
  // }


  submitRequest() {

  if (this.isSubmitting) return;

  this.isSubmitting = true;

  const selectedResource = this.resources.find(
    r => r.id == this.request.resourceId
  );

  const payload = {
  resourceName: selectedResource?.name,
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

        this.request = {
          resourceId: 0,
          priority: '',
          description: ''
        };

        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);

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
