<template>
  <span>{{ item.name }}</span>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDoc} from '@objects/faces/jsdocjson';

@Component export default class MemberListItem extends Vue {
  @Prop({default: () => ({name: `unloaded`})}) item!: JsonDoc;
}
</script>

<style scoped>

</style>
