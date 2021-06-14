import {Injectable, OnInit} from '@angular/core';
import {ComponentPartsModel, User} from '../models';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataService {
  // Максимально тупая реализация кэша, но надежная и понятная

  private currentUser: User | null;
  private readonly favoritesCacheKey = 'favorites_components_parts';
  private favoritesCacheKeyForUser = '';

  _favoritesItemIdToComponentsParts: { [key: number]: ComponentPartsModel } = {};

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(data => {
      console.log(data);
      if (!data || !Object.keys(data)?.length) {
        this.currentUser =  null;
        return;
      }
      this.currentUser =  {...data};
      this.favoritesCacheKeyForUser = this.favoritesCacheKey + this.currentUser.email;
    });
  }

  removeFavoriteElementFromCache(favoritesComponentItemId: number): void {

    if (!this.currentUser) {
      return;
    }

    const toLoad = localStorage.getItem(this.favoritesCacheKeyForUser) || null;
    if (toLoad !== null) {
      this._favoritesItemIdToComponentsParts = JSON.parse(toLoad);
    }

    if (!this._favoritesItemIdToComponentsParts[favoritesComponentItemId]) {
      return;
    }
    delete this._favoritesItemIdToComponentsParts[favoritesComponentItemId];

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem(this.favoritesCacheKeyForUser, toSave);
  }

  loadFavoritesFromCache(): Array<ComponentPartsModel> {
    if (!this.currentUser) {
      return;
    }

    const toLoad = localStorage.getItem(this.favoritesCacheKeyForUser) || null;
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
    if (!this.currentUser) {
      return;
    }

    this.loadFavoritesFromCache();
    for (const newFavoriteComponentPart of favoritesComponentsPartsParams) {
      const itemId = newFavoriteComponentPart.ItemId;
      this._favoritesItemIdToComponentsParts[itemId] = newFavoriteComponentPart;
    }

    const toSave = JSON.stringify(this._favoritesItemIdToComponentsParts);
    localStorage.setItem(this.favoritesCacheKeyForUser, toSave);
  }
}
