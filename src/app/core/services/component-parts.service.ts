import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComponentPartsModel} from '../models';
import {Observable, of} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {componentToCategoryId, FormControlComponentType} from '../../shared/components';
import {NgOnDestroy} from './unsubscribe.service';
import {cacheObservable} from './cache.helper';

@Injectable({
  providedIn: 'root'
})
export class ComponentPartsService {


  constructor(
    private http: HttpClient,
    private unsubscribe: NgOnDestroy
  ) {

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

  private static parseResponseFromServer(response: Array<any>): Array<ComponentPartsModel> {
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

  @cacheObservable({
    caching: true,
    expiration: 600
  })
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
    return this.http.get<any>(this.baseUrl, requestOptions)
      .pipe(takeUntil(this.unsubscribe))
      .pipe(map((response: Array<any>) => {
        return ComponentPartsService.parseResponseFromServer(response);
      }));
  }

  getPriceByComponentParts(selectedComponents: { [key: string]: ComponentPartsModel }): number {
    let currentPrice = 0;
    for (const [formFieldName, componentPart] of Object.entries(selectedComponents)) {
      currentPrice += componentPart.Price;
    }
    return currentPrice;
  }

  selectComponents(
    selectedComponents: { [key: string]: ComponentPartsModel },
    allComponents: { [key: string]: Array<ComponentPartsModel> },
    maxPricePc: number,
    pcBuildFor: string,
  ): { [key: string]: ComponentPartsModel } {
    let currentPrice = 0;
    const excludeFields = new Set();
    const newSelectedComponents = {...selectedComponents};

    if (pcBuildFor === 'work') {
      excludeFields.add('gpu');
      if (!!newSelectedComponents['gpu']) {
        delete newSelectedComponents['gpu'];
      }
    }

    for (const [formFieldName, componentPart] of Object.entries(newSelectedComponents)) {
      excludeFields.add(formFieldName);
      currentPrice += componentPart.Price;
    }

    let componentIndex = 0;
    let oldPrice = 0;
    while (maxPricePc > currentPrice) {
      for (const [formFieldName, componentParts] of Object.entries(allComponents)) {
        if (excludeFields.has(formFieldName)) {
          continue;
        }
        if (componentIndex + 1 > componentParts.length) {
          excludeFields.add(formFieldName);
          continue;
        }
        const componentPart = componentParts[componentIndex];
        currentPrice += (componentPart.Price - (newSelectedComponents[formFieldName]?.Price || 0));
        newSelectedComponents[formFieldName] = componentPart;
      }
      if ((oldPrice === currentPrice) && !!excludeFields) {
        break;
      }
      oldPrice = currentPrice;
      componentIndex++;
    }
    return newSelectedComponents;
  }
}
