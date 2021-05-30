import {Component, OnInit} from '@angular/core';
import {favoritesTestList, FavoriteItem} from './test-data';
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
    this.favoritesComponentsList = this.favoritesDataService.favoritesComponentsParts;
  }

  goToComponentCard() {
    this.router.navigateByUrl('component_card');
  }

  removeFromFavorite(componentItemId: number) {
    this.favoritesDataService.removeFavoriteElement(componentItemId);
    this.favoritesComponentsList = [...this.favoritesDataService.favoritesComponentsParts];
  }

}
