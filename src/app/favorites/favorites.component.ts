import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FavoritesDataService} from '../core/services';
import {ComponentPartsModel} from '../core/models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  public title: String = '';
  public favoritesComponentsList: Array<ComponentPartsModel> = [];

  constructor(private router: Router,
              private favoritesDataService: FavoritesDataService
  ) {
  }

  ngOnInit(): void {
    this.title = 'Избранное';
    this.favoritesComponentsList = this.favoritesDataService.loadFavoritesFromCache();
  }

  goToComponentCard(itemId: number): void {
    this.router.navigate(
      ['component_card'],
      {queryParams: {itemId: itemId, fromPage: 'favorites'}}
      );
  }

  removeFromFavorite(componentItemId: number) {
    this.favoritesDataService.removeFavoriteElementFromCache(componentItemId);
    this.favoritesComponentsList = [...this.favoritesDataService.loadFavoritesFromCache()];
  }

}
