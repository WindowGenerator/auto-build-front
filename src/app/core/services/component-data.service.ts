import {Injectable} from '@angular/core';
import {ComponentPartsModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {
  commonInfoAboutBuildPc: CommonInfoAboutBuildPc;
  selectedComponents: {[key: string]: ComponentPartsModel} = {};
  constructor() { }
}

export interface CommonInfoAboutBuildPc {
  pc_build_for: PcBuildForType;
  max_pc_price: number;
  pc_price: number;
}

export type PcBuildForType = 'work' | 'gaming';
