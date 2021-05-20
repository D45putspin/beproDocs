import {Component, Vue} from 'vue-property-decorator';
import {RouteNames} from '@/router/route-names';


@Component export default class MetaExtended extends Vue {
  get $routeNames() { return RouteNames; }
  get $routeMeta(): any { return this.$route.meta; }
}
