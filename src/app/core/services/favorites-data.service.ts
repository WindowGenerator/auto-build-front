import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ComponentPartsModel} from '../models';
import {CommonInfoAboutBuildPc} from './component-data.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataService {
  // Максимально тупая реализация кэша, но надежная и понятная

  private readonly favoritesCacheKey = 'favorites_components_parts';

  _favoritesItemIdToComponentsParts: { [key: number]: ComponentPartsModel } = {};

  constructor() {
  }

  removeFavoriteElementFromCache(favoritesComponentItemId: number): void {
    const toLoad = localStorage.getItem(this.favoritesCacheKey) || null;
    if (toLoad !== null) {
      this._favoritesItemIdToComponentsParts = JSON.parse(toLoad);
    }

    if (!this._favoritesItemIdToComponentsParts[favoritesComponentItemId]) {
      return;
    }
    delete this._favoritesItemIdToComponentsParts[favoritesComponentItemId];

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem(this.favoritesCacheKey, toSave);
  }

  loadFavoritesFromCache(): Array<ComponentPartsModel> {
    const toLoad = localStorage.getItem(this.favoritesCacheKey) || null;
    if (toLoad !== null) {
      this._favoritesItemIdToComponentsParts = JSON.parse(toLoad);
    }
    const favoritesItemIdToComponentsPartsArray: Array<ComponentPartsModel> = [];
    for (const [_, componentPart] of Object.entries(this._favoritesItemIdToComponentsParts)) {
      favoritesItemIdToComponentsPartsArray.push(componentPart);
    }
    return favoritesItemIdToComponentsPartsArray;
  }

  saveFavoritesToCache(favoritesComponentsPartsParams: Array<ComponentPartsModel>) {
    this.loadFavoritesFromCache();
    for (const newFavoriteComponentPart of favoritesComponentsPartsParams) {
      const itemId = newFavoriteComponentPart.ItemId;
      this._favoritesItemIdToComponentsParts[itemId] = newFavoriteComponentPart;
    }

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem(this.favoritesCacheKey, toSave);
  }
}
