<template>
  <div id="app">
    <nav-bar />
    <div class="d-flex">
      <side-bar class="w-15" :items="navList"></side-bar>
      <div class="w-85">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SideBar from '@components/side-bar.vue';
import {DocumentationService} from '@services/documentation';
import NavBar from '@components/nav-bar.vue';

@Component({
             components: {NavBar, SideBar}
           }) export default class extends Vue {
  loading = false;
  navList: string[] = [];

  async mounted(): Promise<void> {
    this.loading = true;

    if (!DocumentationService.scopedMembers$.value)
      await DocumentationService.loadDocumentation();

    this.navList
        .splice(0, this.navList.length,
                ...Array.from(new Set(Object.entries(DocumentationService.scopedMembers$.value!)
                                            .map(([name,]) => name))));

    this.loading = false;
    return;
  }
}
</script>
