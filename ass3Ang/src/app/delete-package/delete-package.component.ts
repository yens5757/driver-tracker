import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { WeightPipe } from '../weight.pipe';
import { Ass3strsubPipe } from '../ass3strsub.pipe';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, WeightPipe, Ass3strsubPipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
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

  deletePackage(packageId: string) {
    this.db.deletePackage(packageId).subscribe(() => {
      this.router.navigate(['list-package']);
    });
  };
  showDriver(drivershow: any) {
    this.driverDb = drivershow;
  };
}
