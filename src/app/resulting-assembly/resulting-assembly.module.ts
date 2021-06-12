import {NgModule} from '@angular/core';

import {ResultingAssemblyComponent} from './resulting-assembly.component';
import {SharedModule} from '../shared';
import {ResultingAssemblyRoutingModule} from './resulting-assembly-routing.module';


@NgModule({
  imports: [
    SharedModule,
    ResultingAssemblyRoutingModule,
  ],
  declarations: [
    ResultingAssemblyComponent
  ],
})
export class ResultingAssemblyModule {}
