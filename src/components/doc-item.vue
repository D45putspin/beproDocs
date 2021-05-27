<template>
  <div class="pb-3">
    <div class="pb-1">{{item.name}}</div>
    <div class="pb-1"><span v-html="description"></span></div>
    <doc-params v-if="hasParams" :doc-params="item.params" />
    <doc-params v-if="hasProperties" :doc-params="item.properties" />
    <doc-params v-if="hasReturn" :doc-params="item.returns" />
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {JsonDoc} from '@objects/faces/jsdocjson';
import DocParams from '@components/doc-params.vue';
import {parseType} from '@helpers/parse-type';
import {docsFind} from '@helpers/docs-find';
import {DocumentationService} from '@services/documentation';

@Component({
             components: {DocParams}
           }) export default class DocItem extends Vue {
  @Prop({default: () => ({name: `unloaded`})}) item!: JsonDoc;

  get hasParams(): boolean { return !!this.item.params?.length; }

  get hasReturn(): boolean { return !!this.item.returns?.length; }

  get hasProperties(): boolean { return !!this.item.properties?.length; }

  description = ``

  mounted() {

    if (!this.item.description)
      this.description = ``;
    else if (this.item.description.search(`{@link`) < 0)
      this.description = this.item.description;
    else {
      const replaceLink = (str: string): string => {
        if (!str)
          return ``;

        const match = str.match(/(?:{@(?:l|L)ink (.+?)})/);
        if (!match)
          return str;

        const [text, linkName] = match;
        const options = parseType(linkName);

        if (!options.kind)
          return replaceLink(str.replace(text, linkName));

        const exist = docsFind(null, DocumentationService.raw$.value, options);
        if (!exist.length)
          return replaceLink(str.replace(text, linkName));

        return str.replace(text, `<a href="#/docs/${(options.memberof || options.name)!}${options.memberof && `/${options.name}` || ''}">${linkName}</a>`);
      }

      this.description = replaceLink(this.item.description);
    }

  }
}
</script>

<style>

</style>
