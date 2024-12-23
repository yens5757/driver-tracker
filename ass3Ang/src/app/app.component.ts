import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageNotFoundComponent, InvalidDataComponent, FooterComponent, AddDriverComponent, AddPackageComponent, DeleteDriverComponent, DeletePackageComponent, HeaderComponent, ListDriversComponent, ListPackagesComponent, StatisticsComponent, UpdateDriverComponent, UpdatePackageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ass3Ang';
  
}
