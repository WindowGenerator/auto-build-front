import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.css']
})
export class AdvicesComponent implements OnInit {
  title: String = '';

  constructor() {
  }

  ngOnInit(): void {
    this.title = 'Советы по сборке ПК';
  }

}
