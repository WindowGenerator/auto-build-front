export interface FavoriteItem {
  src: string;
  name: string;
  cost: number;
}

export const favoritesTestList: Array<FavoriteItem> = [
  {
    src: './assets/resources/advices/third-article.jpg',
    name: 'Материнская плата Asus TUF GAMING B550-PLUS (sAM4, AMD B550)',
    cost: 13550
  },
  {
    src: './assets/resources/advices/firtst-article.jpg',
    name: 'Процессор AMD Ryzen 7 3800X 3.9(4.5)GHz 32MB sAM4 Tray (100-000000025)',
    cost: 1488
  },
  {
    src: './assets/resources/advices/second-article.jpg',
    name: 'ОЗУ Patriot DDR4 16GB (2x8GB) 4000Mhz Viper Steel (PVS416G400C9K)',
    cost: 22222
  },
];
