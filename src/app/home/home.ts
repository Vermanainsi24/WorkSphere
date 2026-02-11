import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './home.html',
   styleUrls: ['./home.css'],   // ✅ THIS MUST EXIST

})
export class HomeComponent {}
