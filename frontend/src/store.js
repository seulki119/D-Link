/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import http from "@/util/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    items: [],
    item: {},
  },
  getters: {
    userId(state) {
      return state.userInfo.pk;
    },
    userName(state) {
      return state.userInfo.username;
    },
    items(state) {
      return state.items;
    },
    item(state) {
      return state.item;
    },
  },
  //차후 Taste는 로그인이 되어있을때만 갈 수 있게;
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
      localStorage.removeItem("token");
    },
    // item list
    setItems(state, payload) {
      state.items = payload;
    },
    // item 한개
    setItem(state, payload) {
      state.item = payload;
    },
  },
  actions: {
    //로그인 시도
    login({ dispatch }, loginObj) {
      //로그인 -> 토큰 반환
      http
        .post("/rest-auth/login/", loginObj)
        .then((res) => {
          // 로그인 성공시, token을 헤더에 포함시킴
          let token = res.data.key;

          // 토큰을 로컬스토리지에 저장
          localStorage.setItem("token", token);
          this.dispatch("getUserInfo");
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하세요.");
        });
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "home" }).catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    getUserInfo({ commit }) {
      // 로컬 스토리지에 저장된 토큰 불러오기
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      // 헤더 with 토큰 -> 유저 정보를 반환
      // 새로고침 하더라도 토큰만으로 계속 유저 정보를 요청하게 한다!
      http.get("/rest-auth/user/", config).then((response) => {
        let userInfo = {
          pk: response.data.pk,
          username: response.data.username,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        };
        //여기서 나중에 userinfo에서 취향 여부를 확인하고 취향을 선택 안 했을경우,
        //taste로 가게 한다.!!
        commit("loginSuccess", userInfo);
        router.push("home");
      });
      // .catch(() => {
      //   alert("이메일과 비밀번호를 확인하세요.");
      // });
    },
    getArticles(context, payload) {
      http
        .get(payload)
        .then((response) => {
          // console.log(response);
          context.commit("setItems", response.data);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    getArticle(context, payload) {
      http
        .get(payload)
        .then((response) => {
          console.log(response);
          context.commit("setItem", response.data);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    doScrap(context, payload) {
      // 로컬 스토리지에 저장된 토큰 불러오기
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      http
        .get(payload.url, config)
        .then((response) => {
          console.log(response);
          // scrap처리 후 카운트 변경을 위해 데이터를 다시 받아온다.
          console.log(payload.url);
          if (payload.page == "articlelist") {
            this.dispatch("getArticles", "/articles");
          } else if (payload.page == "article") {
            this.dispatch("getArticle", `/articles/${payload.id}`);
          }
        })
        .catch((response) => {
          console.log(response);
          alert("에러가 발생했습니다.");
        });
    },
    googleLogin(context, authCode) {
      http
      .post("/accounts/google/", { code: authCode, redirect_uri: 'postmessage' })
      .then((res) => {
        console.log(res)
        let token = res.data.key;

        // 토큰을 로컬스토리지에 저장
        localStorage.setItem("token", token);
        this.dispatch("getUserInfo");
      })
      .catch(error => {
        console.log(error)
      }) 
    }
  },
});
