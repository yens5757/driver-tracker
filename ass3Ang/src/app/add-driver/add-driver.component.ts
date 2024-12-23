import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  driver = {
    driver_name: '',
    driver_department: '',
    driver_licence: '',
    driver_isActive: true,
  };
  driver_isActive = 'false';
  constructor(private db: DatabaseService, private router:Router) {}
  onSubmit() {
    this.driver.driver_isActive = (this.driver_isActive === 'true');
    this.db.addDriver(this.driver).subscribe({
      next: () => {
        this.router.navigate(['list-driver']);
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error.error);
        this.router.navigate(['invalid-data', errorResponse.error.error]);
      }
    });
  }
}
