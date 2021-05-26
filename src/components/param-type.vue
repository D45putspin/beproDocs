<template>
  <div class="d-contents">
    <span v-if="isArrayType">Array</span>
    <span v-if="isPromiseType">Promise</span>
    <span v-if="!hasArray && !hasPromise">
      {{name}}
    </span>
    <param-type v-if="hasArray || hasPromise" :type="name" :is-array-type="hasArray" :is-promise-type="hasPromise"/>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

@Component export default class ParamType extends Vue {
  @Prop({default: ``}) type!: string;
  @Prop({default: false}) isArrayType!: boolean;
  @Prop({default: false}) isPromiseType!: boolean;

  name = ``;

  hasArray = false;
  hasPromise = false;

  mounted() {

    if (this.type.search(/^Array\.</) === 0)
      this.hasArray = true;

    if (this.type.search(/^Promise\.</) === 0)
      this.hasPromise = true;

    if (this.hasArray || this.hasPromise)
      this.name = this.type.replace(/^(Promise|Array)\.</g, ``).replace(/>$/g,``);
    else this.name = this.type;

  }
}
</script>

<style scoped>

</style>
