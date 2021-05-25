<template>
  <div class="pb-3">
    <div class="pb-1">{{item.name}}</div>
    <div class="pb-1">{{item.description}}</div>
    <doc-params v-if="hasParams" :doc-params="item.params" />
    <doc-params v-if="hasProperties" :doc-params="item.properties" />
    <doc-params v-if="hasReturn" :doc-params="item.returns" />
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDoc} from '@objects/faces/jsdocjson';
import DocParams from '@components/doc-params.vue';
@Component({
             components: {DocParams}
           }) export default class DocItem extends Vue {
  @Prop({default: () => ({name: `unloaded`})}) item!: JsonDoc;

  get hasParams(): boolean { return !!this.item.params?.length; }

  get hasReturn(): boolean { return !!this.item.returns?.length; }

  get hasProperties(): boolean { return !!this.item.properties?.length; }
}
</script>

<style>

</style>
