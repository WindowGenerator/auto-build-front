import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import {KeysPipe} from './pipes/keys-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
    declarations: [
        ListErrorsComponent,
        ShowAuthedDirective,
        KeysPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ListErrorsComponent,
        RouterModule,
        ShowAuthedDirective,
        KeysPipe
    ]
})
export class SharedModule {}
