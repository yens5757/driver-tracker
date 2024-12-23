import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { IndexComponent } from './index/index.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GeminiAiComponent } from './gemini-ai/gemini-ai.component';
import { TranslateComponent } from './translate/translate.component';


export const routes: Routes = [
    {path:'', component: IndexComponent},
    {path:'add-driver', component: AddDriverComponent},
    {path:'add-package', component: AddPackageComponent},
    {path:'list-driver', component: ListDriversComponent},
    {path:'list-package', component: ListPackagesComponent},
    {path:'delete-driver', component: DeleteDriverComponent},
    {path:'delete-package', component: DeletePackageComponent},
    {path:'update-driver', component: UpdateDriverComponent},
    {path:'update-package', component: UpdatePackageComponent},
    {path:'invalid-data/:errorMessage', component:InvalidDataComponent},
    {path:'statistics', component: StatisticsComponent},
    {path:'gemini-ai', component: GeminiAiComponent},
    {path:'translate', component: TranslateComponent},
    {path: '**', component: PageNotFoundComponent}
];
