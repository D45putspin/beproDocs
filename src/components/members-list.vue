<template>
  <div>
    <ul v-for="[kind, docs] of Object.entries(members)" :key="kind">
      <li>
        <member-list-kind class="SideBarText" :kind="kind"></member-list-kind>
      </li>
      <ul>
        <li v-for="doc of docs" :key="doc.name">
          <member-list-item
            v-on:click="$emit('closeMenu')"
            class="SideBarText"
            :item="doc"
          ></member-list-item>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { JsonDoc } from "@objects/faces/jsdocjson";
import MemberListItem from "@components/member-list-item.vue";
import MemberListKind from "@components/member-list-kind.vue";
@Component({
  components: { MemberListKind, MemberListItem },
})
export default class MembersList extends Vue {
  @Prop({ default: () => ({}) }) members!: { [p: string]: JsonDoc[] };
}
</script>


