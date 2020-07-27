import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

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
