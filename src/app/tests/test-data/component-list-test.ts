export interface TestComponentInfo {
  formControlName: string;
  list: Array<String>;
}

export const testComponentsList: { [key: string]: Array<string> } = {
  'cpu': [
    'AMD A-Series Bristol Ridge',
    'AMD Ryzen 3 Matisse',
    'Intel Core i7 Rocket Lake',
    'AMD Ryzen 3 Renoir',
    'AMD Ryzen 5 Pinnacle Ridge'
  ],
  'mom': [],
  'gpu': [],
  'ram': [],
  'power_core': [],
  'cold_system': [],
  'ssd': [],
  'hdd': [],
  'case': [],
  'monitor': [],
  'keyboard': [],
  'mouse': [],
};

