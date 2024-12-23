import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  constructor(private db: DatabaseService, private router:Router) {}
  selectedPackage = {
    id: '',
    package_destination: ''
  };
  packagesList: any[] = [];

  ngOnInit(): void {
    this.loadDriver();
  };
  loadDriver() {
    this.db.getPackages().subscribe((data: any) => {
        this.packagesList = data;
      }
    );
  };
  onSubmit() {
    console.log(this.selectedPackage);
    this.db.updatePackage(this.selectedPackage).subscribe({
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
