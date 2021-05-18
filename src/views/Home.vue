<template>
  <div class="home">
    check console for now.
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @ts-ignore
import VueMarkdown from '@adapttive/vue-markdown';

@Component({
  components: {
    VueMarkdown,
  },
})
export default class Home extends Vue {}
</script>
