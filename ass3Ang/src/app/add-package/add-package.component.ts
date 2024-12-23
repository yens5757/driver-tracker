import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  package = {
    package_title: '',
    package_weight: null,
    package_destination: '',
    description: '',
    isAllocated: false,
    driver_id: ''
  };
  isAllocated = 'false';
  constructor(private db: DatabaseService, private router:Router) {}
  drivers: any[] = [];

  ngOnInit(): void {
    this.loadDriver();
  };
  loadDriver() {
    this.db.getDrivers().subscribe((data: any) => {
        this.drivers = data;
      }
    );
  };
  onSubmit() {
    this.package.isAllocated = (this.isAllocated === 'true');
  
    this.db.addPackage(this.package).subscribe({
      next: () => {
        this.router.navigate(['list-package']);
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error.error);
        this.router.navigate(['invalid-data', errorResponse.error.error]);
      }
    });
  }
  
}
