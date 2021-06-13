import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {ComponentCardService, ComponentDataService, FavoritesDataService} from '../core/services';
import {ComponentPartsModel} from '../core/models';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.css']
})
export class ComponentCardComponent implements OnInit {

  title: String = '';
  selectedComponent: ComponentPartsModel;
  characteristics: { [key: string]: string };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private componentDataService: ComponentDataService,
    private favoritesDataService: FavoritesDataService,
    private componentCardService: ComponentCardService,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(
      map((paramAsMap: ParamMap) => {
        if (!paramAsMap) {
          this.router.navigateByUrl('');
          return;
        }
        const fromPage = paramAsMap.get('fromPage');

        if (fromPage === 'result-assembly') {

          const componentTypeName = paramAsMap.get('componentTypeName');

          const selectedComponents = this.componentDataService.selectedComponents;

          if (!selectedComponents[componentTypeName]) {
            this.router.navigateByUrl('');
            return;
          }
          this.selectedComponent = selectedComponents[componentTypeName];
          console.log(selectedComponents);
        } else if (fromPage === 'favorites') {

          const itemId = parseFloat(paramAsMap.get('itemId'));

          const favorites = this.favoritesDataService.loadFavoritesFromCache();

          for (const favorite of favorites) {
            if (favorite.ItemId === itemId) {
              this.selectedComponent = favorite;
            }
          }

          if (!this.selectedComponent) {
            this.router.navigateByUrl('');
            return;
          }
        } else {
          console.log('Тту не возможно было оказаться');
          return;
        }

        this.title = this.selectedComponent.Name;

        this.characteristics = this.componentCardService.getCharacteristicsByComponentName(this.selectedComponent);
        console.log(this.characteristics);
      })
    ).subscribe();
  }

  addComponentToFavorite() {
    this.favoritesDataService.saveFavoritesToCache([this.selectedComponent]);
    this.router.navigateByUrl('favorites');
  }

}
