import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressbookComponent } from './addressbook/addressbook.component';

const routes: Routes = [
  { path: "", component: AddressbookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
