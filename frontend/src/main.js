import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import GAuth from 'vue-google-oauth2'
import VueResource from 'vue-resource';

Vue.config.productionTip = false;
// const gauthOption = {
//   clientId: '122178100323-91dhrvqu6bm14umnnovogcud8upb4c71.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

Vue.use(GAuth, {clientId: '122178100323-91dhrvqu6bm14umnnovogcud8upb4c71.apps.googleusercontent.com', scope: 'profile email'})
Vue.use(VueResource);

new Vue({
  router,
  store,
  vuetify,
  //페이지 리로드시 token이 있으면 로그인 상태 유지
  beforeCreate() {
    store.dispatch("getUserInfo")
  },
  render: h => h(App)
}).$mount("#app");
