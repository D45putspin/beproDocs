<template>
  <div class="home">
    <vue-markdown class="markdown" v-if="readmeContent">{{readmeContent}}</vue-markdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @ts-ignore
import VueMarkdown from '@adapttive/vue-markdown';
import {Subject} from 'rxjs';
import {Readme$} from '@objects/comms';
import {takeUntil} from 'rxjs/operators';

@Component({
  components: {
    VueMarkdown,
  },
})
export default class Home extends Vue {
  readmeContent = ``;

  async mounted(): Promise<void> {
    this.readmeContent = await fetch(`./static/readme.md`).then(r => r.text());

    return;
  }
}
</script>

<style lang="scss">
.markdown h1 + p br { display: none; }
</style>
