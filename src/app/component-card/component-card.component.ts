import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.css']
})
export class ComponentCardComponent implements OnInit {

  title: String;

  constructor() { }

  ngOnInit(): void {
    this.title = "Материнская плата Asus TUF GAMING B550-PLUS (sAM4, AMD B550)";

  }

}
