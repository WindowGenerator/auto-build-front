import {Component, OnInit} from '@angular/core';
import {componentsList} from '../shared/components/components-list';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resulting-assembly',
  templateUrl: './resulting-assembly.component.html',
  styleUrls: ['./resulting-assembly.component.css']
})
export class ResultingAssemblyComponent implements OnInit {
  readonly componentsList = componentsList;
  title: String = '';

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.title = 'Полученная сборка';
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
