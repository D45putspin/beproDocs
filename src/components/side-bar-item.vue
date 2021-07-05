<template>
  <router-link
    class="SideBarText h4"
    :to="{ name: routeName, params: { ...routeParams } }"
    >{{ label }}</router-link
  >
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { RouteNames } from "@/router/route-names";

@Component
export default class SideBarItem extends Vue {
  @Prop({ default: RouteNames.Unknown }) routeName!: string;
  @Prop({ default: `unknown label` }) label!: string;
  @Prop({ default: () => ({}) }) routeParams!: never;
}
</script>

