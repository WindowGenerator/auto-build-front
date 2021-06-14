import {Component, OnInit} from '@angular/core';
import {componentsList} from '../shared/components';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonInfoAboutBuildPc, ComponentDataService, FavoritesDataService} from '../core/services';
import {ComponentPartsModel} from '../core/models';

@Component({
  selector: 'app-resulting-assembly',
  templateUrl: './resulting-assembly.component.html',
  styleUrls: ['./resulting-assembly.component.css']
})
export class ResultingAssemblyComponent implements OnInit {
  readonly componentsList = componentsList;

  componentsDataList: { [key: string]: ComponentPartsModel } = {};
  commonInfoAboutBuildPc: CommonInfoAboutBuildPc;
  title: String = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private componentDataService: ComponentDataService,
    private favoritesDataService: FavoritesDataService,
  ) {
  }

  ngOnInit(): void {
    this.title = 'Полученная сборка';
    this.commonInfoAboutBuildPc = this.componentDataService.commonInfoAboutBuildPc;
    this.componentsDataList = this.componentDataService.selectedComponents;
  }

  submitForm() {

  }

  addComponentsToFavorites() {
    const favoritesComponentsParts = [];
    for (const [_, componentPart] of Object.entries(this.componentsDataList)) {
      favoritesComponentsParts.push(componentPart);
    }
    this.favoritesDataService.saveFavoritesToCache(favoritesComponentsParts);
    this.router.navigateByUrl('favorites');
  }

  goToComponentCard(componentTypeName: string): void {
    this.router.navigate(
      ['component_card'],
      {queryParams: {componentTypeName: componentTypeName, fromPage: 'result-assembly'}}
    );
  }
}
