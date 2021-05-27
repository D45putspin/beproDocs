<template>
  <div class="d-contents">
    <span v-if="isArrayType" class="caption">Array</span>
    <span v-if="isPromiseType" class="caption">Promise</span>
    <span v-if="!hasArray && !hasPromise">
      <router-link v-if="hasLink.length" :to="{name: `documentation`, params: {name: hasLink[0], member: hasLink[1]}}">{{name}}</router-link>
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
      const [memberof, name] = this.name.split(`~`);
      const options: Partial<JsonDoc> = {};
      let type: JsonDocKinds|null = JsonDocKinds.typedef;

      if (!name && [`string`, `number`, `boolean`, `Object`].every(t=> t !== memberof)) {
        type = JsonDocKinds.class;
        options.name = memberof;
        options.scope = `global`;
      } else {
        options.memberof = memberof;
        options.name = name;
      }

      const exists = docsFind(type, DocumentationService.raw$.value, options);
      if (!exists.length)
        this.name = name;
      else this.hasLink = [memberof, name];
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
