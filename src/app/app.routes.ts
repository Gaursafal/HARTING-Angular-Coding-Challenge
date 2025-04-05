import { Routes } from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';

export const routes: Routes = [
  { path: '', component: HouseListComponent },
  { path: 'house/:id', component: HouseDetailComponent }
];
