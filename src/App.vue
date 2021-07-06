<template>
  <div id="app">
    <nav-bar />
    <div class="d-flex wrapper">
      <side-bar-menu
        id="menu-mobile"
        class="w-100 sticky-top backgroundSideBar d-lg-none"
        style="
          display: none;
          background-color: red;
          overflow: scroll;
          height: 100vh;
          width: 100vw;
          position: fixed;
        "
        :items="navList"
      ></side-bar-menu>
      <side-bar
        class="w-25 sticky-top backgroundSideBar d-none d-lg-block"
        aria-orientation="vertical"
        style="overflow: scroll; height: 100vh"
        :items="navList"
      ></side-bar>
      <div class="backgroundBepro">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@components/side-bar.vue";
import SideBarMenu from "@components/side-bar-menu.vue";
import { DocumentationService } from "@services/documentation";
import NavBar from "@components/nav-bar.vue";

@Component({
  components: { NavBar, SideBar, SideBarMenu },
})
export default class extends Vue {
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
