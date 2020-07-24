import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    // 로그인 성공
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    // 로그인 실패
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    //로그아웃
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    }
  },
  actions: {
    //로그인 시도
    login({ commit }, loginObj) {
      axios.post("http://127.0.0.1:8000/rest-auth/login/", loginObj)
        .then(res => {
          let token = res.data.key;
          let config = {
            headers: {
              "Authorization": `Token ${token}`
            }
          }
          console.log(config)
          axios.get("http://127.0.0.1:8000/rest-auth/user/", config)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout({ commit }) {
      commit("logout")
      router.push({ name: "home" }).catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
  },

});
