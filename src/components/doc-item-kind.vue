<template>
  <h3 class="kindDoc">{{ kind }}</h3>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { JsonDocKinds } from "@objects/faces/jsdocjson";

@Component
export default class DocItemKind extends Vue {
  @Prop({ default: `` }) kind!: JsonDocKinds;
}
</script>

