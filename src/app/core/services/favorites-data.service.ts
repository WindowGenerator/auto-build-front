import {Injectable} from '@angular/core';
import {ComponentPartsModel} from '../models';
import {CommonInfoAboutBuildPc} from './component-data.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataService {

  _favoritesItemIdToComponentsParts: { [key: number]: ComponentPartsModel } = {};

  constructor() {
  }

  set favoritesComponentsParts(favoritesComponentsPartsParams: Array<ComponentPartsModel>) {
    for (const newFavoriteComponentPart of favoritesComponentsPartsParams) {
      const itemId = newFavoriteComponentPart.ItemId;
      this._favoritesItemIdToComponentsParts[itemId] = newFavoriteComponentPart;
    }

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem('favoritesComponentsParts', toSave);
  }

  get favoritesComponentsParts() {
    const toLoad = localStorage.getItem('favoritesComponentsParts') || null;
    if (toLoad !== null) {
      this._favoritesItemIdToComponentsParts = JSON.parse(toLoad);
    }
    const favoritesItemIdToComponentsPartsArray: Array<ComponentPartsModel> = [];
    for (const [_, componentPart] of Object.entries(this._favoritesItemIdToComponentsParts)) {
      favoritesItemIdToComponentsPartsArray.push(componentPart);
    }
    return favoritesItemIdToComponentsPartsArray;
  }

  removeFavoriteElement(favoritesComponentItemId: number): void {
    const toLoad = localStorage.getItem('favoritesComponentsParts') || null;
    if (toLoad !== null) {
      this._favoritesItemIdToComponentsParts = JSON.parse(toLoad);
    }

    if (!this._favoritesItemIdToComponentsParts[favoritesComponentItemId]) {
      return;
    }
    delete this._favoritesItemIdToComponentsParts[favoritesComponentItemId];

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem('favoritesComponentsParts', toSave);
  }
}
