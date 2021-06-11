import {Injectable} from '@angular/core';
import {ComponentPartsModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {
  _commonInfoAboutBuildPc: CommonInfoAboutBuildPc;
  _selectedComponents: { [key: string]: ComponentPartsModel } = {};

  private readonly commonInfoAboutBuildPcKey = 'common_info_about_build_pc';
  private readonly selectedComponentsKey = 'selected_components';

  constructor() {
  }

  set commonInfoAboutBuildPc(commonInfoAboutBuildPcParams: CommonInfoAboutBuildPc) {
    this._commonInfoAboutBuildPc = commonInfoAboutBuildPcParams;

    const toSave = JSON.stringify(this._commonInfoAboutBuildPc);
    localStorage.setItem(this.commonInfoAboutBuildPcKey, toSave);
  }

  get commonInfoAboutBuildPc() {
    const toLoad = localStorage.getItem(this.commonInfoAboutBuildPcKey) || null;
    if (toLoad !== null) {
      this._commonInfoAboutBuildPc = JSON.parse(toLoad);
    }
    return this._commonInfoAboutBuildPc;
  }

  set selectedComponents(selectedComponentsParams: { [key: string]: ComponentPartsModel }) {
    this._selectedComponents = selectedComponentsParams;

    const toSave = JSON.stringify(this._selectedComponents);
    localStorage.setItem(this.selectedComponentsKey, toSave);
  }

  get selectedComponents() {
    const toLoad = localStorage.getItem(this.selectedComponentsKey) || null;
    if (toLoad !== null) {
      this._selectedComponents = JSON.parse(toLoad);
    }
    return this._selectedComponents;
  }
}

export interface CommonInfoAboutBuildPc {
  pc_build_for: PcBuildForType;
  max_pc_price: number;
  pc_price: number;
}

export type PcBuildForType = 'work' | 'gaming';
