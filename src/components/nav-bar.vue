<template>
  <div class="d-flex navbar p-3 align-items-center">
    <router-link class="mr-auto d-flex" :to="{name: `home`}">
      <img src="@/assets/logo.png" class="logo"/>
      <span class="ml-2 align-self-start subtitle-small">//docs</span>
    </router-link>
    <div>
      <a href="https://github.com/bepronetwork/bepro-js">github/bepro-js</a>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

@Component export default class NavBar extends Vue {

}
</script>

<style scoped lang="scss">
.navbar {
  background-color: #0d0f19;
  color: white;
}

.logo {
  width: 129px;
  /*height: 130px;*/
}

a {
  color: white;

  &:hover {
    text-decoration: underline;
  }
}
</style>
