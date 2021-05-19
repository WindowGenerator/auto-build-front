import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FavoritesRoutingModule
  ],
  declarations: [
    FavoritesComponent
  ]
})
export class FavoritesModule {}
