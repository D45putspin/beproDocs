<template>
  <table>
    <thead>
    <tr>
      <th v-if="useNameHeader">Name</th>
      <th>Type</th>
      <th v-if="useAttributesHeader">Attributes</th>
      <th v-if="useDefaultHeader">Default</th>
      <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <doc-param v-for="(param, i) of parsedParams" :param="param" :key="i" />
    </tbody>
  </table>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDocParam} from '@objects/faces/jsdocjson';
import DocParam from '@components/doc-param.vue';
@Component({
             components: {DocParam}
           }) export default class DocParams extends Vue {
  @Prop({default: []}) docParams!: JsonDocParam[];

  parsedParams: JsonDocParam[] = [];

  useNameHeader = false;
  useDefaultHeader = false;
  useAttributesHeader = false;

  /**
   * Parse the params into subparams so we can have `opts.params.params.params.param...` you get the point.
   */
  parseParams() {
    let parent: JsonDocParam | null = null;

    const parseParam = (param: JsonDocParam): JsonDocParam => {
      const copy = {...param};

      if (parent?.name && copy.name) {
        if (!copy.name.includes(`${parent.name}.`))
          parent = copy;
        else {
          copy.name = copy.name.replace(`${parent.name}.`, ``);
          if (!parent.subparams)
            parent.subparams = [];

          parent.subparams.push(copy);
        }
      } else parent = copy;

      return copy;
    }

    const checkForOptions = (param: JsonDocParam) => {
      if (param.name)
        this.useNameHeader = true;

      if (param.defaultvalue !== undefined)
        this.useDefaultHeader = true;

      if (param.optional || param.nullable || param.variable)
        this.useAttributesHeader = true;

      if (param.subparams)
        param.subparams.forEach(checkForOptions)
    }

    this.parsedParams.splice(0, this.parsedParams.length, ...this.docParams.map(parseParam));

    this.useNameHeader = false;
    this.useDefaultHeader = false;
    this.useAttributesHeader = false;

    this.parsedParams.forEach(checkForOptions);
  }

  mounted() {
    this.parseParams();
  }

}
</script>

<style scoped>

</style>
