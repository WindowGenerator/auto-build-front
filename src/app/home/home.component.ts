import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {componentsList} from '../shared/components';
import {testComponentsList} from '../tests/test-data/component-list-test';
import {ComponentPartsService, NgOnDestroy, ComponentDataService, CommonInfoAboutBuildPc} from '../core/services';
import {ComponentPartsModel} from '../core/models';
import {FormControlComponentType, componentToCategoryId, FormControlComponentTypeList} from '../shared/components';
import {zip} from '../shared/helpers';
import {takeUntil} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly componentsList = componentsList;

  title: String = '';
  pcBuildFor = 'work';
  maxPcPrice = 0;
  pcPrice = 0;
  chooserComponentForm: FormGroup;
  selectedComponents: { [key: string]: ComponentPartsModel } = {};

  formNameToMethodToGet: Map<FormControlComponentType, Array<ComponentPartsModel>> = new Map();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private componentPartsService: ComponentPartsService,
    private componentDataService: ComponentDataService,
  ) {
    const formStandardData = {};
    componentsList.forEach(component => {
      formStandardData[component.formControlName] = [null];
    });
    this.chooserComponentForm = this.fb.group(formStandardData);
  }

  ngOnInit() {
    this.title = 'Подобрать комплектующие';

    this.reloadData();
  }

  submitForm() {
    const params = {
      pc_build_for: this.pcBuildFor,
      max_pc_price: this.maxPcPrice,
      pc_price: this.pcPrice
    };
    const formValuesJSON = this.chooserComponentForm.getRawValue();

    Object.entries(formValuesJSON).forEach(([key, value]) => {
      if (value !== null) {
        params[key] = value;
      }
    });
    this.componentDataService.commonInfoAboutBuildPc = params as CommonInfoAboutBuildPc;
    this.componentDataService.selectedComponents = this.selectedComponents;

    this.router.navigate(['/resulting_assembly'], {queryParams: params});
  }

  onChangeComponentEvent(event: ComponentPartsModel, formControlName: FormControlComponentType) {
    if (event === undefined) {
      return;
    }
    const oldData = this.selectedComponents[formControlName];
    this.pcPrice = this.pcPrice - (oldData?.Price || 0) + event.Price;
    this.selectedComponents[formControlName] = event;
  }

  onChangePriceEvent(event) {
    if (event === undefined) {
      return;
    }
    const newPrice = event?.value;
    let priceSelectedComponents = 0;

    for (const [_, ComponentPart] of Object.entries(this.selectedComponents)) {
      priceSelectedComponents += ComponentPart.Price;
    }

    if (newPrice < priceSelectedComponents) {
      console.log('ну блииин');
      return;
    }
    this.maxPcPrice = newPrice;
  }

  clearComponent(controlFieldName: string) {
    this.chooserComponentForm.get(controlFieldName).setValue(null);
  }

  returnNewStyleFor(pcBuildFor: string) {
    if (this.pcBuildFor !== pcBuildFor) {
      return 'btn btn-md btn-default';
    } else {
      return 'btn btn-md btn-primary';
    }
  }

  changePcBuildFor(pcBuildFor: string) {
    this.pcBuildFor = pcBuildFor;

  }

  reloadData() {
    // TODO: сделать по нажатию на селект запрос на бек
    const requests: Array<Observable<Array<ComponentPartsModel>>> = [];
    for (const keyFormControlName of FormControlComponentTypeList) {
      requests.push(this.componentPartsService.getPartsByName(keyFormControlName));
    }
    forkJoin(
      requests
    ).subscribe((responses) => {
      for (const [keyFormControlName, list] of zip(FormControlComponentTypeList, responses)) {
        this.formNameToMethodToGet[keyFormControlName] = [...list];
      }
    });
  }
}
