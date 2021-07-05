import Vue from 'vue'
import App from './App.vue'
import router from './router';

import '@/styles/reset.scss';
import '@/styles/helpers.scss';
import '@/styles/typography.scss';
import '@/styles/spacing.scss';
import '@/styles/general.scss';
const BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue.esm');
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
const hljs = require("highlight.js");


Vue.use(BootstrapVue, hljs);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
