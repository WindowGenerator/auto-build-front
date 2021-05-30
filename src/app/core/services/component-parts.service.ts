import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComponentPartsModel} from '../models';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {componentToCategoryId, FormControlComponentType} from '../../shared/components';

@Injectable({
  providedIn: 'root'
})
export class ComponentPartsService {


  constructor(private http: HttpClient) {

  }
  private readonly baseUrl = 'https://api.retailrocket.net/api/2.0/recommendation/popular/52e0e8141e994426487779d9';

  private static sortComponentsPartsDataList(componentsPartsData: Array<ComponentPartsModel>): Array<ComponentPartsModel> {
    const arrayToSorted = [...componentsPartsData];
    arrayToSorted.sort(function (a, b) {
      const priceA = a.Price;
      const priceB = b.Price;
      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return arrayToSorted;
  }


  getPartsByName(name: FormControlComponentType): Observable<Array<ComponentPartsModel>> {
    if (!componentToCategoryId.has(name)) {
      return of([]);
    }
    const categoryIds = componentToCategoryId.get(name).toString();
    const requestOptions = {
      params: {
        categoryIds: categoryIds,
        format: 'json',
      }
    };
    return this.http.get<any>(this.baseUrl, requestOptions).pipe(map((response: Array<any>) => {
      return this.parseResponseFromServer(response);
    }));
  }


  parseResponseFromServer(response: Array<any>): Array<ComponentPartsModel> {
    const componentsPartsData: Array<ComponentPartsModel> = [];
    if (!response) {
      return componentsPartsData;
    }
    for (const value of response) {
      componentsPartsData.push(<ComponentPartsModel>{
        CategoryNames: value.CategoryNames,
        ItemId: value.ItemId,
        Name: value.Name,
        PictureUrl: value.PictureUrl,
        Price: value.Price,
        Url: value.Url,
        Vendor: value.Vendor,
      });
    }
    return ComponentPartsService.sortComponentsPartsDataList(componentsPartsData);
  }

  getComponentById(itemId: number | string): Observable<any> {
    if (typeof itemId === 'number') {
      itemId = itemId.toString();
    }
    const requestOptions = {
      params: {
        itemIds: itemId,
        format: 'json',
      }
    };
    const url = `https://api.retailrocket.net/api/2.0/recommendation/alternative/52e0e8141e994426487779d9`;
    return this.http.get<any>(url, requestOptions).pipe(map(response => {
      console.log(response);
    }));
  }
}
