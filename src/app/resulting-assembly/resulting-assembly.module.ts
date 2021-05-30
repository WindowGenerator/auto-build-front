import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResultingAssemblyComponent } from './resulting-assembly.component';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { ResultingAssemblyRoutingModule } from './resulting-assembly-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ResultingAssemblyRoutingModule
  ],
  declarations: [
    ResultingAssemblyComponent
  ]
})
export class ResultingAssemblyModule {}
