<template>
  <div class="d-contents">
    <tr :class="{[`level-${level}`]: true}">
      <td v-if="hasName">{{param.name}}</td>
<!--      <td>{{JSON.stringify(param.type)}}</td>-->
      <param-types :types="param.type" />
      <td v-if="hasAttributes">
        <span v-if="param.optional">&lt;optional&gt;</span>
        <span v-if="param.nullable">&lt;nullable&gt;</span>
        <span v-if="param.variable">&lt;variable&gt;</span>
      </td>
      <td v-if="hasDefaultValue">
        {{param.defaultvalue}}
      </td>
      <td>{{param.description}}</td>
    </tr>

    <template v-if="param.subparams">
      <doc-param  v-for="(subparam, i) of param.subparams" :param="subparam" :key="i" :level="level+1" />
    </template>

  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDocParam} from '@objects/faces/jsdocjson';
import ParamTypes from '@components/param-types.vue';
@Component({
             components: {ParamTypes}
           }) export default class DocParam extends Vue {
  @Prop({default: () => ({})}) param!: JsonDocParam;
  @Prop({default: 0}) level!: number;

  get hasName(): boolean {
    return !!this.param.name;
  }

  get hasAttributes(): boolean {
    return this.param.optional || this.param.nullable || this.param.variable || false;
  }

  get hasDefaultValue(): boolean {
    return this.param.defaultvalue !== undefined;
  }

}
</script>

<style scoped lang="scss">
  @for $i from 1 through 10 {
    .level-#{$i} td:first-child {
      padding-left: .5rem;
      margin-left: $i * .5rem;
      border-left: 1px solid #DEE1E5
    }
  }
</style>
