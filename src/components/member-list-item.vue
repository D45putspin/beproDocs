<template>
  <router-link
    :to="{ name: $route.name, params: { ...$route.params, member: item.name } }"
    >{{ item.name }}</router-link
  >
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { JsonDoc } from "@objects/faces/jsdocjson";

@Component
export default class MemberListItem extends Vue {
  @Prop({ default: () => ({ name: `unloaded` }) }) item!: JsonDoc;
}
</script>

<style>
</style>
