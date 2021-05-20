import Vue from 'vue'
import App from './App.vue'
import router from './router';

import '@/styles/reset.scss';
import '@/styles/helpers.scss';
import '@/styles/typography.scss';
import '@/styles/spacing.scss';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
