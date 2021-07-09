<template>
  <div id="app">
    <nav-bar />
    <div v-if="!isMob" class="d-flex wrapper">
      <side-bar
        class="w-25 sticky-top backgroundSideBar"
        aria-orientation="vertical"
        style="overflow: scroll; height: 100vh"
        :items="navList"
      ></side-bar>

      <div class="backgroundBepro" id="backgroundBepro">
        <router-view />
      </div>
    </div>
    <!--  mobile v  -->
    <div class="mobile" v-if="isMob">
      <side-bar
        id="backgroundSideBar"
        v-if="isMob"
        class="w-100 pt-0 backgroundSideBar"
        :items="navList"
      ></side-bar>

      <div class="backgroundBepro" id="backgroundBepro">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@components/side-bar.vue";
import { DocumentationService } from "@services/documentation";
import NavBar from "@components/nav-bar.vue";

@Component({
  components: { NavBar, SideBar },
})
export default class extends Vue {
  get isMob(): boolean {
    return (window as any).isMobile.any;
  }
  loading = true;
  navList: string[] = [];
  hljs = require("highlight.js");

  async mounted(): Promise<void> {
    this.loading = true;

    if (!DocumentationService.scopedMembers$.value)
      await DocumentationService.loadDocumentation();

    this.navList.splice(
      0,
      this.navList.length,
      ...Array.from(
        new Set(
          Object.entries(DocumentationService.scopedMembers$.value!).map(
            ([name]) => name
          )
        )
      )
    );
    this.hljs.highlightAll;
    this.loading = false;
    return;
  }
}
</script>
