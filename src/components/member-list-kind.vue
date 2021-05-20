<template>
  <span>{{kind}}</span>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDocKinds} from '@objects/faces/jsdocjson';

@Component export default class MemberListKind extends Vue {
  @Prop({default: ``}) kind!: JsonDocKinds;
}
</script>

<style scoped>

</style>
