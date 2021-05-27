import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import DocNameExists from '@/router/meta/doc-name-exists';
import {DocsRoute} from '@/router/docs';
import {RouteNames} from '@/router/route-names';
import UnknownView from '@/views/unknown-view.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

  {
    path: '/',
    name: RouteNames.Home,
    component: Home
  },
  DocsRoute,
  {
    path: `/404`,
    name: RouteNames.LostPage,
    component: UnknownView,
  },
  {
    path: `*`,
    redirect: RouteNames.LostPage,
    name: RouteNames.Unknown,
  },
]


const router = new VueRouter({
  routes
});

[
  DocNameExists.beforeEach,
].forEach(guard => router.beforeEach(guard))



export default router
