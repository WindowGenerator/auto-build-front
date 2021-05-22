import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'advices',
    loadChildren: () => import('./advices/advices.module').then(m => m.AdvicesModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'resulting_assembly',
    loadChildren: () => import('./resulting-assembly/resulting-assembly.module').then(m => m.ResultingAssemblyModule)
  },
  {
    path: 'component_card',
    loadChildren: () => import('./component-card/component-card.module').then(m => m.ComponentCardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
