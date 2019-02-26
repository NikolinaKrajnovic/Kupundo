import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from '../auctions/new/new.component';
import { SearchComponent } from '../auctions/search/search.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
