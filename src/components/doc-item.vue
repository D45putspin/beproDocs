<template>
  <div class="pb-3">
    <div class="pb-1">{{item.name}}</div>
    <div class="pb-1">{{item.description}}</div>
    <div class="pb-1">{{JSON.stringify(item.params)}}</div>
    <div class="pb-1">{{JSON.stringify(item.returns)}}</div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDoc} from '@objects/faces/jsdocjson';

@Component export default class DocItem extends Vue {
  @Prop({default: () => ({name: `unloaded`})}) item!: JsonDoc;
}
</script>

<style scoped>

</style>
