import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon
  ],
  templateUrl: './request-resource.html',
  styleUrls: ['./request-resource.css']
})
export class RequestResourceComponent {

  // Mock resource list (replace with API later)
  resources = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Monitor' },
    { id: 3, name: 'Office Chair' }
  ];

  request = {
    resourceId: '',
    description: '',
    priority: 'LOW'
  };

  submitRequest() {

    const payload = {
      ...this.request,
      status: 'APPLIED',
      requestDate: new Date()
    };

    console.log('Request Submitted:', payload);

    alert('Resource request submitted successfully!');

    // Reset form
    this.request = {
      resourceId: '',
      description: '',
      priority: 'LOW'
    };
  }
}
