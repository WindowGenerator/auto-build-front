import {Observable, of as observableOf} from 'rxjs';
import {finalize, map, share} from 'rxjs/operators';

interface CacheOptions {
  /**
   @property expiration - время, через которое кэш для данного объекта будет неактуален, сек
   **/
  withoutArgs?: boolean;
  caching?: boolean;
  expiration?: number;
}

interface CacheData {
  data;
  expiration?: number;
}

export function cacheObservable(options?: CacheOptions) {
  options = options || {};
  options.withoutArgs = options.withoutArgs || false;
  options.caching = options.caching || false;
  options.expiration = options.expiration * 1000 || 0;

  const cacheMapObservable = new Map<string, Observable<any>>();
  const cacheData = new Map<string, CacheData>();

  return function (target, key: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      let cacheKey = target.constructor.name + '.' + key;

      if (!options.withoutArgs) {
        const args = [];
        for (let _i = 0; _i < arguments.length; _i++) {
          args.push(arguments[_i]);
        }
        cacheKey += JSON.stringify(args);
      }

      const obs = cacheMapObservable.get(cacheKey);
      if (obs) {
        return obs;
      }

      if (options.caching) {
        const c = cacheData.get(cacheKey);
        if (c && (!options.expiration || Date.now() < c.expiration)) {
          return observableOf(c.data);
        }
        if (c && Date.now() >= c.expiration) {
          cacheData.delete(cacheKey);
        }
      }

      const result = originalMethod.apply(this, arguments).pipe(finalize(() => {
        cacheMapObservable.delete(cacheKey);
      })).pipe(map(res => {
        if (options.caching) {
          cacheData.set(cacheKey, {
            data: res,
            expiration: Date.now() + options.expiration
          });
        }
        return res;
      }), share());

      cacheMapObservable.set(cacheKey, result);

      return result;
    };

    return descriptor;
  };
}
