import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  constructor(private db: DatabaseService, private router:Router) {}
  selectedDriver = {
    id: '',
    driver_licence: '',
    driver_department: ''
  };
  driversList: any[] = [];

  ngOnInit(): void {
    this.loadDriver();
  };
  loadDriver() {
    this.db.getDrivers().subscribe((data: any) => {
        this.driversList = data;
      }
    );
  };
  onSubmit() {
      console.log(this.selectedDriver);
      this.db.updateDriver(this.selectedDriver).subscribe({
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
