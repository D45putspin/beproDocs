<template>
  <ul>
    <li v-for="(name) of items" :key="name">
      <side-bar-item :route-name="$routeNames.Documentation" :label="name" :route-params="{name}"></side-bar-item>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Vue, Watch} from 'vue-property-decorator';
import MetaExtended from '@components/mixins/meta-extended';
import SideBarItem from '@components/side-bar-item.vue';
@Component({
             components: {SideBarItem}
           }) export default class SideBar extends Mixins(MetaExtended) {
  @Prop({default: () => []}) items!: string[];
}
</script>
