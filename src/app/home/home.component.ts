import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordControlValidator} from '../shared/password';
import {componentsList, ComponentInfo} from '../shared/components';
import {testComponentsList} from '../tests/test-data/component-list-test';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly componentsList = componentsList;
  readonly testComponentsList = testComponentsList;

  title: String = '';
  pcBuildFor = 'work';
  pcPrice = 0;
  chooserComponentForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    const formStandardData = {};
    componentsList.forEach(component => {
      formStandardData[component.formControlName] = [null];
    });
    this.chooserComponentForm = this.fb.group(formStandardData);
  }

  ngOnInit() {
    this.title = 'Подобрать комплектующие';
  }

  submitForm() {
    const params = {
      pc_build_for: this.pcBuildFor,
      pc_price: this.pcPrice,
    };
    const formValuesJSON = this.chooserComponentForm.getRawValue();

    Object.entries(formValuesJSON).forEach(([key, value]) => {
      if (value !== null) {
        params[key] = value;
      }
    });

    this.router.navigate(['/resulting_assembly'], { queryParams: params });
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
}
