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
  destroyed$ = new Subject<boolean>();
  readmeContent = ``;

  mounted() {

    Readme$.pipe(takeUntil(this.destroyed$))
           .subscribe(content => this.readmeContent = content)
  }

  destroyed() {
    this.destroyed$.next(true);
  }
}
</script>

<style lang="scss">
.markdown h1 + p br { display: none; }
</style>
