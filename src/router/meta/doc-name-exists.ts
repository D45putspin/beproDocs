import {RouteMeta} from '@objects/route-meta';
import {NavigationGuard, Route} from 'vue-router';
import {RouteNames} from '@/router/route-names';
import {DocumentationService} from '@services/documentation';

export default class DocNameExists extends RouteMeta<boolean> {
  public metaKey: `docNameExists` = `docNameExists`;

  static get beforeEach(): NavigationGuard {
    return async (to, from, next) => {
      if (!this.metaWithKey(to, `docNameExists`))
        return next();

      if (!DocumentationService.scopedMembers$.value)
        if (!await DocumentationService.loadDocumentation())
          return next({name: RouteNames.Unknown})

      if (!to.params.name)
        return next({name: RouteNames.Unknown})

      if (!DocumentationService.getNamedMemberOf(to.params.name))
        return next({name: RouteNames.Unknown})

      next();
    }
  }
}
