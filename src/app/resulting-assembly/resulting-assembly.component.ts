import {Component, OnInit} from '@angular/core';
import {componentsList} from '../shared/components';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonInfoAboutBuildPc, ComponentDataService} from '../core/services';
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

    this.router.navigateByUrl('favorites');
  }

  goToComponentCard(componentTypeName: string, componentName: string): void {
    this.router.navigateByUrl('component_card');
  }

}
