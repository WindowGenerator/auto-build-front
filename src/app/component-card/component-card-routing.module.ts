import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { ComponentCardComponent } from './component-card.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentCardRoutingModule {}
