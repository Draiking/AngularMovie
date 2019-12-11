import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {MainListComponent} from './main-list/main-list.component';

const routes: Routes = [
    {
      path: '', pathMatch: 'full', component: MainListComponent
    },
    {
        path: 'detail/:id',  component: DetailComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
