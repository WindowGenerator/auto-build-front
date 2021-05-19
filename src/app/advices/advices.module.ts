import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvicesComponent } from './advices.component';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { AdvicesRoutingModule } from './advices-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AdvicesRoutingModule
  ],
  declarations: [
    AdvicesComponent
  ]
})
export class AdvicesModule {}
