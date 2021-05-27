<template>
  <div class="d-contents">
    <span v-if="isArrayType" class="caption">Array</span>
    <span v-if="isPromiseType" class="caption">Promise</span>
    <span v-if="!hasArray && !hasPromise">
      <router-link v-if="hasLink.length" :to="{name: `documentation`, params: {name: hasLink[0], member: hasLink[1] || undefined}}">{{name}}</router-link>
      <span v-else>{{name}}</span>
    </span>
    <param-type v-if="hasArray || hasPromise" :type="name" :is-array-type="hasArray" :is-promise-type="hasPromise"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {docsFind} from '@helpers/docs-find';
import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';
import {DocumentationService} from '@services/documentation';
import {parseType} from '@helpers/parse-type';

@Component export default class ParamType extends Vue {
  @Prop({default: ``}) type!: string;
  @Prop({default: false}) isArrayType!: boolean;
  @Prop({default: false}) isPromiseType!: boolean;

  name = ``;

  hasLink: string[] = [];
  hasArray = false;
  hasPromise = false;

  mounted(): void {

    if (this.type.search(/^Array\.</) === 0)
      this.hasArray = true;

    if (this.type.search(/^Promise\.</) === 0)
      this.hasPromise = true;

    if (this.hasArray || this.hasPromise)
      this.name = this.type.replace(/^(Promise|Array)\.</g, ``).replace(/>$/g,``);
    else this.name = this.type;

    if ((!this.hasArray && !this.hasPromise)) {
      const options = parseType(this.name)

      if (!options.kind)
        return;

      const exists = docsFind(null, DocumentationService.raw$.value, options);

      if (exists.length)
        this.hasLink = [(options.memberof || options.name)!, options.memberof && options.name || ``];

    }
  }
}
</script>

<style scoped lang="scss">
  .caption {
    padding: .3rem;
    background-color: lightgray;
    //&::after {
    //  content: ">";
    //  margin-left: .5rem;
    //}
  }
</style>
