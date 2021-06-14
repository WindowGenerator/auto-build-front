import {Injectable} from '@angular/core';
import {ComponentPartsModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComponentCardService {

  constructor() {
  }


  getCharacteristicsByComponentName(selectedComponent: ComponentPartsModel): { [key: string]: string } {
    const model = selectedComponent.Name.replace(/[а-яёА-ЯЁ]+/g, '');

    let color = null;

    let colorCount = 0;
    const normName = selectedComponent.Name.replace('ё', 'е').toLowerCase();

    for (const _color of colors) {
      if (normName.indexOf(_color) !== -1) {
        if (colorCount > 0) {
          color += ` ${_color}`;
          continue;
        }
        color = _color;
        colorCount += 1;
      }
    }
    const withColor = color ? {'Цвет': color} : {};
    return {
      'Бренд': selectedComponent.Vendor,
      'Категория': selectedComponent.CategoryNames[0],
      'Модель': model,
      ...withColor
    };
  }
}

const colors = [
  'зеленый', 'желтый', 'белый', 'серебристый', 'черный', 'синий', 'красный', 'фиолетовый', 'прозрачный', 'серый'
];
