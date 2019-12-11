import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MainListComponent } from './main-list/main-list.component';
import { MovisComponent } from './movis/movis.component';



@NgModule({
    declarations: [
        HeaderComponent,
        MainComponent,
        DetailComponent,
        MainListComponent,
        MovisComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatListModule,
        MainRoutingModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        HeaderComponent,
        MainComponent
    ]
})
export class MainModule {
}
