import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  driverCount: number = 0;
  packageCount: number = 0;

  constructor(private db: DatabaseService) {}
  ngOnInit(): void {
    this.db.getPackages().subscribe((data: any) => {
      this.packageCount = data.length;
    });
    this.db.getDrivers().subscribe((data: any) => {
      this.driverCount = data.length;
    });
  };
}
