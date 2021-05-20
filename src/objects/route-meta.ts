import {NavigationGuard, Route} from 'vue-router';

export class RouteMeta<MetaValue = any> {
  constructor(protected metaValue: MetaValue) {}

  public metaKey = ``;

  static metaWithKey<V = any>(route: Route, key: string, getValue = false): V | undefined {
    const meta = [...route.matched]
      .reverse()
      .filter(({meta}) => !!meta)
      .find(_route => _route.meta?.hasOwnProperty(key))?.meta;

    return meta && getValue ? meta[key] || undefined : meta || undefined;
  }

  static get beforeEach(): NavigationGuard {
    return ((to, from, next) => next());
  }

  log(...rest: never[]): void {
    console.warn(`(${this.metaKey})`, ...rest)
  }

  get meta() {
    return {
      [this.metaKey]: this.metaValue
    };
  }

}
