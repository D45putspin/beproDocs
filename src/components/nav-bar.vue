<template>
  <div class="navbar p-3 w-100 align-items-center">
    <router-link
      class="mr-auto d-flex d-none d-lg-block"
      :to="{ name: `home` }"
    >
      <img src="@/assets/logo.png" class="logo" />
      <span class="ml-2 align-self-start subtitle-small">//docs</span>
    </router-link>
    <div>
      <button class="btn-warning mr-4" id="theme-switcher">Switch Mode</button>
      
    </div>
    <div>
      <a href="https://github.com/bepronetwork/bepro-js">github/bepro-js</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
// Wait for document to load
document.addEventListener("DOMContentLoaded", function (event) {
  document.documentElement.setAttribute("data-theme", "light");

  // Get our button switcher
  var themeSwitcher = document.getElementById("theme-switcher");

  // When our button gets clicked
  if (themeSwitcher) {
    themeSwitcher.onclick = function () {
      // Get the current selected theme, on the first run
      // it should be `light`
      var currentTheme = document.documentElement.getAttribute("data-theme");

      // Switch between `dark` and `light`
      var switchToTheme = currentTheme === "dark" ? "light" : "dark";

      // Set our currenet theme to the new one
      document.documentElement.setAttribute("data-theme", switchToTheme);
    };
  }
});
</script>

<style scoped lang="scss">
.navbar {
  background-color: #0d0f19;
  color: white;
  height: 4rem;
}

.logo {
  width: 129px;
  /*height: 130px;*/
}

a {
  color: white;
  &:visited {
    color: inherit;
  }
  &:hover {
    text-decoration: underline;
  }
}
</style>
