import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import ApiService from "./common/BaseApi.js";
import router from "./Router";
import Vue2Editor from "vue2-editor";

Vue.config.productionTip = false
ApiService.init();
Vue.use(Vue2Editor);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
