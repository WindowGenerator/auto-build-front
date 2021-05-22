import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentCardComponent } from './component-card.component';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { ComponentCardRoutingModule } from './component-card-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentCardRoutingModule
  ],
  declarations: [
    ComponentCardComponent
  ]
})
export class ComponentCardModule {}
