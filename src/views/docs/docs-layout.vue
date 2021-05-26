<template>
  <div class="d-flex">
    <div class="" ref="membersList">
      <template v-for="[kind, docs] in Object.entries(membersOf || {})">
        <ul :key="kind">
          <li><doc-item-kind :kind="kind" /></li>
          <ul>
            <li v-for="doc in docs" :key="doc.name" :id="doc.name">
              <doc-item :item="doc" />
            </li>
          </ul>
        </ul>
      </template>
    </div>
    <members-list class="" :members="membersOf"></members-list>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import MembersList from '@components/members-list.vue';
import {DocumentationService} from '@services/documentation';
import {JsonDoc} from '@objects/faces/jsdocjson';
import DocItemKind from '@components/doc-item-kind.vue';
import DocItem from '@components/doc-item.vue';
import {docsFind} from '@helpers/docs-find';
@Component({
             components: {DocItem, DocItemKind, MembersList}
           }) export default class DocsLayout extends Vue {

  membersOf: {[p: string]: JsonDoc[]} = {} as unknown as any;

  setMemberOfObjectTo(name: string) {
    this.membersOf = DocumentationService.getNamedMemberOf(name)!;
  }

  navigateTo(memberName?: string) {
    if (!memberName)
      return;

    if (!docsFind(null, [...Object.values(this.membersOf)].flat(), {name: memberName}).length)
      this.$router.push({name: this.$route.name!, params: { ... this.$route.params?.name ? {name: this.$route.params?.name} : {} }});
    else (this.$refs.membersList as Element).querySelector(`li#${memberName}`)?.scrollIntoView();
  }

  @Watch(`$route.params.name`) watchMemberOfName(newValue: string, oldValue: string) {
    if (newValue !== oldValue)
      this.setMemberOfObjectTo(newValue);
  }

  @Watch(`$route.params.member`) watchMemberName(newValue: string, oldValue: string) {
    if (newValue === oldValue)
      return;

    this.navigateTo(newValue)
  }

  mounted() {
    this.setMemberOfObjectTo(this.$route.params.name);

    if (this.$route.params?.member)
      this.navigateTo(this.$route.params.member);
  }
}
</script>

