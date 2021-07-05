<template>
  <ul>
    <li class="mt-4" v-for="name of items" :key="name">
      <side-bar-item
        :route-name="$routeNames.Documentation"
        :label="name"
        :route-params="{ name }"
      ></side-bar-item>
      <template v-if="name === $route.params.name && membersOf">
        <members-list class="SideBarText" :members="membersOf"></members-list>
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Mixins,
  Prop,
  Vue,
  Watch,
} from "vue-property-decorator";
import MetaExtended from "@components/mixins/meta-extended";
import SideBarItem from "@components/side-bar-item.vue";
import MembersList from "@components/members-list.vue";
import WatchDocNameParam from "@components/mixins/watch-doc-name-param";
@Component({
  components: { SideBarItem, MembersList },
})
export default class SideBar extends Mixins(MetaExtended, WatchDocNameParam) {
  @Prop({ default: () => [] }) items!: string[];
}
</script>
