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
          axios.get("http://127.0.0.1:8000/rest-auth/user/", config)
            .then(response => {
              let userInfo = {
                pk: response.data.pk,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                username: response.data.username
              }
              commit('loginSuccess', userInfo)
            })
            .catch(() => {
              alert('이메일과 비밀번호를 확인하세요.')
            })
        })
        .catch(() => {
          alert('이메일과 비밀번호를 확인하세요.')
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
