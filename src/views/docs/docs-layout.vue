<template>
  <div class="d-flex justify-content-between">
    <div class="mr-auto">
      <template v-for="[kind, docs] in Object.entries(members || {})">
        <ul :key="kind">
          <li><doc-item-kind :kind="kind" /></li>
          <ul>
            <li v-for="doc in docs" :key="doc.name">
              <doc-item :item="doc" />
            </li>
          </ul>
        </ul>
      </template>
    </div>
    <members-list :members="members"></members-list>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {ParsedScopes$} from '@objects/comms';
import MembersList from '@components/members-list.vue';
import {DocumentationService} from '@services/documentation';
import {JsonDoc} from '@objects/faces/jsdocjson';
import DocItemKind from '@components/doc-item-kind.vue';
import DocItem from '@components/doc-item.vue';
@Component({
             components: {DocItem, DocItemKind, MembersList}
           }) export default class DocsLayout extends Vue {

  members: {[p: string]: JsonDoc[]} = {} as unknown as any;

  setMemberObjectTo(name: string) {
    this.members = DocumentationService.getNamedMember(name)!;
  }

  @Watch(`$route.params.name`) watchMemberName(newValue: string, oldValue: string) {
    if (newValue !== oldValue)
      this.setMemberObjectTo(newValue);

    console.log(JSON.parse(JSON.stringify(this.members)));
  }

  mounted() {
    this.setMemberObjectTo(this.$route.params.name);
  }
}
</script>

<style scoped>

</style>
