<template>
  <div>
    <ul v-for="[kind, docs] of Object.entries(members)" :key="kind">
      <li>
        <member-list-kind class="SideBarText" :kind="kind"></member-list-kind>
      </li>
      <ul>
        <li v-for="doc of docs" :key="doc.name">
          <member-list-item class="SideBarText" :item="doc"></member-list-item>
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
import { AnonymousSubject } from "rxjs/internal/Subject";
import { Route } from "vue-router";
@Component({
  components: { MemberListKind, MemberListItem },
})
export default class MembersList extends Vue {
  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    let bgB = document.getElementById("backgroundBepro");
    let bgS = document.getElementById("backgroundSideBar");
    if (bgB && bgS) {
      bgB.className = "backgroundBepro";
      bgS.style.display = "none";
    }
  }
  @Prop({ default: () => ({}) }) members!: { [p: string]: JsonDoc[] };
}
</script>




