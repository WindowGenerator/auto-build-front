import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { AdvicesComponent } from './advices.component';

const routes: Routes = [
  {
    path: '',
    component: AdvicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvicesRoutingModule {}

