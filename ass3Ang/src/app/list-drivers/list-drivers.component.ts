import { Component } from '@angular/core';
import { Ass3strsubPipe } from '../ass3strsub.pipe';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [Ass3strsubPipe, DatePipe, FormsModule, RouterLink, WeightPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
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
  showPackages(driver: any) {
    this.packageDb = driver.assigned_packages;
  };
}
