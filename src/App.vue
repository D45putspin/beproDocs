<template>
  <div id="app" class="d-flex">
    <side-bar class="" :items="navList"></side-bar>
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SideBar from '@components/side-bar.vue';
import {DocumentationService} from '@services/documentation';

@Component({
             components: {SideBar}
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: left;
  color: #2c3e50;
}

</style>
