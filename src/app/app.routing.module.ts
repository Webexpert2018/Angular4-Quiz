import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemComponent} from './item/item.component';
const routes: Routes = [
{ path: 'updateItem', component: ItemComponent },
{ path: 'addItem', component: ItemComponent },
{path : '', component : ItemComponent}
];
@NgModule({
imports: [
RouterModule.forRoot(routes)
],
exports: [
RouterModule
],
declarations: []
})
export class AppRoutingModule { }