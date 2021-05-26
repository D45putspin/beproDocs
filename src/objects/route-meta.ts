import {NavigationGuard, Route} from 'vue-router';

/**
 * Use this class to extend meta and find extensions on the current route,
 * @see DocNameExists
 * @example
 * class HelloExtended extends RouteMeta<boolean> {
 *   constructor(protected metaValue: MetaValue)
 *   public metaKey: `helloExtended` = `helloExtended`;
 * }
 *
 * const helloExtended = new HelloExtended(true);
 * const route = {
 *   name: 'hello-extended',
 *   path: '/hello-extended',
 *   meta: {
 *     ...helloExtended.meta,
 *   }
 * }
 *
 * const metaWithHelloExtended = RouteMeta.metaWithKey(this.$route, helloExtended.metaKey)
 * const valueOfHelloExtended = RouteMeta.metaWithKey<boolean>(this.$route, helloExtended.metaKey, true)
 */
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
