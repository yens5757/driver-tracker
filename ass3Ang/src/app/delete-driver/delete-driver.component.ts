import { Component } from '@angular/core';
import { Ass3strsubPipe } from '../ass3strsub.pipe';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [Ass3strsubPipe, DatePipe, FormsModule, RouterLink, WeightPipe],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  driverDb: any[] = [];
  packageDb: any[] = [];
  constructor(private db: DatabaseService, private router:Router) {}
  ngOnInit() {
    this.loadDriver();
  };
  loadDriver() {
    this.db.getDrivers().subscribe((data: any) => {
        this.driverDb = data;
      }
    );
  };
  deleteDriver(driverId: string) {
    this.db.deleteDriver(driverId).subscribe((data:any) => {
      this.router.navigate(['list-driver']);
    });};
  showPackages(driver: any) {
    this.packageDb = driver.assigned_packages;
  };
}
