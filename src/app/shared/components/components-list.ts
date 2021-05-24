export interface ComponentInfo {
  formControlName: string;
  componentName: string;
  placeholder: string;
}

export const componentsList: ComponentInfo[] = [
  {formControlName: 'cpu', componentName: 'Процессор', placeholder: 'Выбрать процессор'},
  {formControlName: 'mom', componentName: 'Материнская плата', placeholder: 'Выбрать материнскую плату'},
  {formControlName: 'gpu', componentName: 'Видеокарта', placeholder: 'Выбрать видеокарту'},
  {formControlName: 'ram', componentName: 'Модули памяти', placeholder: 'Выбрать модули памяти'},
  {formControlName: 'power_core', componentName: 'Блок питания', placeholder: 'Выбрать блок питания'},
  {formControlName: 'cold_system', componentName: 'Система охлаждения', placeholder: 'Выбрать систему охлаждения'},
  {formControlName: 'ssd', componentName: 'SSD диск', placeholder: 'Выбрать SSD диск'},
  {formControlName: 'hdd', componentName: 'HDD диск', placeholder: 'Выбрать HDD диск'},
  {formControlName: 'case', componentName: 'Корпус', placeholder: 'Выбрать корпус'},
  {formControlName: 'monitor', componentName: 'Монитор', placeholder: 'Выбрать монитор'},
  {formControlName: 'keyboard', componentName: 'Клавиатура', placeholder: 'Выбрать клавиатуру'},
  {formControlName: 'mouse', componentName: 'Мышка', placeholder: 'Выбрать мышку'},
];
