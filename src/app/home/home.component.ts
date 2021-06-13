import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {componentsList, FormControlComponentType, FormControlComponentTypeList} from '../shared/components';
import {CommonInfoAboutBuildPc, ComponentDataService, ComponentPartsService, PcBuildForType} from '../core/services';
import {ComponentPartsModel} from '../core/models';
import {zip} from '../shared/helpers';
import {forkJoin, Observable} from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly componentsList = componentsList;

  title: String = '';

  commonInfoAboutBuildPc: CommonInfoAboutBuildPc = {
    pc_build_for: 'work',
    max_pc_price: 0,
    pc_price: 0
  } as CommonInfoAboutBuildPc;

  selectedComponents: { [key: string]: ComponentPartsModel } = {};

  formNameToMethodToGet: { [key: string]: Array<ComponentPartsModel> } = {};

  constructor(
    private router: Router,
    private componentPartsService: ComponentPartsService,
    private componentDataService: ComponentDataService,
  ) {
  }

  ngOnInit() {
    this.title = 'Подобрать комплектующие';
    this.reloadData();
  }

  pickUpPcComponents() {
    // TODO: Полный бред. Зачем мне хранить данные в форме, если я по итогу данные забираю из selectedComponents
    this.componentDataService.selectedComponents = this.componentPartsService.selectComponents(
      this.selectedComponents,
      this.formNameToMethodToGet,
      this.commonInfoAboutBuildPc.max_pc_price,
      this.commonInfoAboutBuildPc.pc_build_for
    );

    this.commonInfoAboutBuildPc.pc_price = this.componentPartsService.getPriceByComponentParts(
      this.componentDataService.selectedComponents
    );

    this.componentDataService.commonInfoAboutBuildPc = this.commonInfoAboutBuildPc;

    this.router.navigate(['/resulting_assembly']);
  }

  onChangeComponentEvent(event: ComponentPartsModel, formControlName: FormControlComponentType) {
    if (event === undefined) {
      return;
    }
    const oldData = this.selectedComponents[formControlName];
    const newPrice = this.commonInfoAboutBuildPc.pc_price - (oldData?.Price || 0) + event.Price;
    if (newPrice > this.commonInfoAboutBuildPc.max_pc_price) {
      alert('Нельзя выбрать комплектующих на сумму большую максимальной');
      return;
    }
    this.commonInfoAboutBuildPc.pc_price = newPrice;
    this.selectedComponents[formControlName] = event;
  }

  onChangePriceEvent(event) {
    if (event === undefined) {
      return;
    }
    const newPrice = event?.value;

    let minPriceSelectedComponents = 0;
    const excludeFields = new Set();

    for (const [formFieldName, componentPart] of Object.entries(this.selectedComponents)) {
      minPriceSelectedComponents += componentPart.Price;
      excludeFields.add(formFieldName);
    }

    for (const [formFieldName, componentParts] of Object.entries(this.formNameToMethodToGet)) {
      if (excludeFields.has(formFieldName)) {
        continue;
      }
      const firstComponent = componentParts[0];
      minPriceSelectedComponents += firstComponent.Price;
    }

    if (newPrice < minPriceSelectedComponents) {
      alert('Нельзя изменить сумму, чтобы минимум по сумме превышал минимум по цене');
      return;
    }

    this.commonInfoAboutBuildPc.max_pc_price = newPrice;
  }

  clearComponent(controlFieldName: string) {
    // this.chooserComponentForm.get(controlFieldName).setValue(null);
  }

  returnNewStyleFor(pcBuildFor: string) {
    if (this.commonInfoAboutBuildPc.pc_build_for !== pcBuildFor) {
      return 'btn btn-md btn-default';
    } else {
      return 'btn btn-md btn-primary';
    }
  }

  changePcBuildFor(pcBuildFor: PcBuildForType) {
    this.commonInfoAboutBuildPc.pc_build_for = pcBuildFor;

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
