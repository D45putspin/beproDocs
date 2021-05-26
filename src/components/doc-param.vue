<template>
  <div class="d-contents">
    <tr>
      <td v-if="hasName">{{param.name}}</td>
      <td>{{JSON.stringify(param.type)}}</td>
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
      <doc-param  v-for="(subparam, i) of param.subparams" :param="subparam" :key="i" />
    </template>

  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDocParam} from '@objects/faces/jsdocjson';

@Component export default class DocParam extends Vue {
  @Prop({default: () => ({})}) param!: JsonDocParam;

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

<style scoped>

</style>
