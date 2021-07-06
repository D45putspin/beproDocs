<template>
  <div class="d-flex justify-content-start">
    <table class="mt-3 overflow-scroll">
      <thead>
        <tr>
          <th scope="col" v-if="useNameHeader">Name</th>
          <th scope="col">Type</th>
          <th scope="col" v-if="useAttributesHeader">Attributes</th>
          <th scope="col" v-if="useDefaultHeader">Default</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <doc-param v-for="(param, i) of parsedParams" :param="param" :key="i" />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { JsonDocParam } from "@objects/faces/jsdocjson";
import DocParam from "@components/doc-param.vue";
@Component({
  components: { DocParam },
})
export default class DocParams extends Vue {
  @Prop({ default: [] }) docParams!: JsonDocParam[];

  parsedParams: JsonDocParam[] = [];

  useNameHeader = false;
  useDefaultHeader = false;
  useAttributesHeader = false;

  /**
   * Parse the params into subparams so we can have `opts.params.params.params.param...` you get the point.
   */
  parseParams(): void {
    let parent: JsonDocParam | null = null;

    const parseParam = (param: JsonDocParam): JsonDocParam | undefined => {
      const copy = { ...param };

      if (parent?.name && copy.name) {
        if (!copy.name.includes(`${parent.name}.`)) parent = copy;
        else {
          copy.name = copy.name.replace(`${parent.name}.`, ``);
          if (!parent.subparams) parent.subparams = [];

          parent.subparams.push(copy);
          return;
        }
      } else parent = copy;

      return copy;
    };

    const checkForOptions = (param: JsonDocParam) => {
      if (param.name) this.useNameHeader = true;

      if (param.defaultvalue !== undefined) this.useDefaultHeader = true;

      if (param.optional || param.nullable || param.variable)
        this.useAttributesHeader = true;

      if (param.subparams) param.subparams.forEach(checkForOptions);
    };

    this.parsedParams.splice(
      0,
      this.parsedParams.length,
      ...(this.docParams.map(parseParam).filter((v) => !!v) as JsonDocParam[])
    );
    this.parsedParams.forEach(checkForOptions);
  }

  mounted(): void {
    this.parseParams();
  }
}
</script>

<style scoped>
</style>
