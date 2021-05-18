import {Route} from 'vue-router';

export class RouteMeta<MetaKey = string, MetaValue = any> {

  constructor(protected metaKey: MetaKey, protected metaValue: MetaValue) {}
  private route?: Route;

  protected log(...rest: never[]): void {
    console.warn(`(${this.metaKey})`, ...rest)
  }

  protected getAssociatedRoute(scopedRoute?: Route): Route {
    const route = scopedRoute || this.route;
    if (!route) throw new Error(`${this.metaKey} needs a route`)
    return route;
  }

  protected metaWithKey<V = any>(route: Route, key: MetaKey = this.metaKey, getValue = false): MetaValue | V | null {
    const meta = [...this.getAssociatedRoute(route).matched]
      .reverse()
      .filter(({meta}) => !!meta)
      .find(_route => _route.meta?.hasOwnProperty(key))?.meta;

    return meta && getValue ? meta[key] : meta || null;
  }

  protected getValue(): MetaValue|null {
    return this.metaWithKey(this.getAssociatedRoute(), undefined, true);
  }

  onRoute(route: Route) {
    this.route = route;
    return this;
  }

  get meta() {
    return ({
      // @ts-ignore
      [this.metaKey]: this.metaValue
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeEach(to: Route, from: Route, next: never): void {
    return;
  }
}
