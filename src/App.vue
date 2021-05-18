<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {docsFind} from '@helpers/docs-find';
import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';

@Component({}) export default class extends Vue {
  loading = false;

  async mounted(): Promise<void> {
    this.loading = true;

    const documentation =
        await fetch(`./static/docs.json`).then(r => r.json());

    const classes = docsFind(JsonDocKinds.class, documentation.docs, {scope: 'global'});

    const sidebar: string[] = [];
    const members: {[k: string]: {[k: string]: JsonDoc[]}} = {};

    for (const doc of classes) {
      sidebar.push(doc.name);

      for (const member of docsFind(null, documentation.docs, {memberof: doc.name})) {
        if (!members[doc.name])
          members[doc.name] = {};

        if (!members[doc.name][member.kind])
          members[doc.name][member.kind] = [];

        members[doc.name][member.kind].push(member);
      }
    }

    console.log(`Left-nav`, sidebar);
    console.log(`Classes`, classes);
    console.log(`Members`, members);

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
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
