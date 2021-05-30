import {Component, OnInit} from '@angular/core';
import {favoritesTestList, FavoriteItem} from './test-data';
import {Router} from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  public title: String = '';
  public favoritesComponentsList: Array<any> = favoritesTestList;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.title = 'Избранное';
  }

  goToComponentCard() {
    this.router.navigateByUrl('component_card');
  }

}
