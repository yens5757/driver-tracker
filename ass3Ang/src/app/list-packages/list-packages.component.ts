import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';
import { Ass3strsubPipe } from '../ass3strsub.pipe';


@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, WeightPipe, Ass3strsubPipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {
  packageDb: any[] = [];
  driverDb: any = null;
  constructor(private db: DatabaseService, private router:Router) {}

  ngOnInit() {
    this.loadPackages();
  };

  loadPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packageDb = data;
    });
  };
  showDriver(drivershow: any) {
    this.driverDb = drivershow;
  };
}