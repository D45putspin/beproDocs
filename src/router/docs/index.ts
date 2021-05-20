import DocNameExists from '@/router/meta/doc-name-exists';
import {RouteConfig} from 'vue-router';
import {DocsLayout} from '@/router/components';
import {RouteNames} from '@/router/route-names';

export const DocsRoute: RouteConfig = {
  path: `/docs/:name/`,
  component: DocsLayout,
  name: RouteNames.Documentation,
  meta: {
    ...new DocNameExists(true).meta,
  }
}
