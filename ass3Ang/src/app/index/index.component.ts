import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
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
