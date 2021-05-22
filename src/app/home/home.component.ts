import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordControlValidator} from '../shared/password';
import {componentsList, ComponentInfo} from './components-list';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly componentsList = componentsList;

  title: String = '';
  pcBuildFor = 'work';
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
    this.router.navigateByUrl('/resulting_assembly');
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
