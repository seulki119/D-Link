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
    alarms: 0, //알람 숫자 기록용
    socket: null,
    chatSocket: null,
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
    alarms(state) {
      return state.alarms;
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
      if (state.items.length != 0) {
        state.items.push(payload);
      } else {
        state.items = payload;
      }
    },
    // item 한개
    setItem(state, payload) {
      state.item = payload;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    setChatSocket(state, socket) {
      state.chatSocket = socket;
    },
    removeSocket(state) {
      state.socket = null;
    },
    removeChatSocket(state) {
      state.chatSocket = null;
    },
    setAlarms(state, payload) {
      state.alarms = parseInt(localStorage.getItem("alarmCount")) + payload;
      localStorage.setItem("alarmCount", state.alarms)
    },
    resetAlarms(state) {
      state.alarms = 0;
      localStorage.setItem("alarmCount", 0);
    }
  },
  actions: {
    //로그인 시도
    login({ dispatch, commit }, loginObj) {
      //로그인 -> 토큰 반환
      http
        .post("/login/", loginObj)
        .then((res) => {
          // 로그인 성공시, token을 헤더에 포함시킴
          let token = res.data.key;

          // 토큰을 로컬스토리지에 저장
          localStorage.setItem("token", token);

          this.dispatch("getUserInfo");
          this.dispatch("socketConnect", {
            token: token,
            type: 0 // 알람 소켓
          });
        })
        .catch((res) => {
          console.log(res);
          alert("이메일과 비밀번호를 확인하세요.");
        });

    },
    logout({ commit }) {
      commit("logout");
      // 소켓이 연결되어있는 경우 연결해제
      let socket = this.state.socket
      let chatSocket = this.state.chatSocket
      if (socket) {
        socket.close();
        commit("removeSocket")
      }
      if (chatSocket) {
        chatSocket.close();
        commit("removeChatSocket")
      }
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
      let data = "";

      // 헤더 with 토큰 -> 유저 정보를 반환
      // 새로고침 하더라도 토큰만으로 계속 유저 정보를 요청하게 한다!
      http
        .post("/accounts/user/", data, config)
        .then((response) => {
          console.log(response);

          let userInfo = {
            pk: response.data.id,
            username: response.data.username,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            taste1: response.data.taste1,
            taste2: response.data.taste2,
          };
          //안 읽은 알람 카운트 갯수 가져오는 용
          http
            .get(`/alarms/` + response.data.id, config)
            .then(res => {
              let count = 0;
              for (let i = 0; i < res.data.length; i++) {
                if (!res.data[i].isFetch) {
                  count++;
                }
              }
              localStorage.setItem("alarmCount", count);
              console.log(count)
              commit("setAlarms", 0)
            })
            .catch(err => {
              console.log(err);
            });
          //여기서 나중에 userinfo에서 취향 여부를 확인하고 취향을 선택 안 했을경우,
          //taste로 가게 한다.!!
          commit("loginSuccess", userInfo);
          console.log(userInfo.username)
          if (userInfo.username.includes("@")) {
            alert("소셜 로그인 가입 하신 분은 유저네임을 정해주세요!");
            router.push({ name: "username" })
          } else if (userInfo.taste1 === null || userInfo.taste2 === null) {
            alert("주류 취향을 선택하고 d-link를 이용해주세요!");
            router.push({
              name: "taste",
              params: { username: userInfo.username },
            });
          } else {
            router.push("articlelist");
          }
        })
        .catch((response) => {
          console.log(response);
        });
    },
    getArticles(context, payload) {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
      console.log(payload.addr)
      http
        .patch(payload.addr, { counter: payload.counter }, config)
        .then((response) => {
          console.log(response);
          context.commit("setItems", response.data);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },

    getArticle(context, payload) {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      http
        .get(payload, config)
        .then((response) => {
          console.log(response);
          context.commit("setItem", response.data);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    doScrap(context, payload) {
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
          console.log(payload.url);
        })
        .catch((response) => {
          console.log(response);
          alert("에러가 발생했습니다.");
        }).finally(() => {
          this.dispatch("getArticle", `/articles/${payload.id}`);
        })
      this.dispatch("getArticle", `/articles/${payload.id}`);
    },
    googleLogin(context, authCode) {
      http
        .post("/accounts/google/", {
          code: authCode,
          redirect_uri: "postmessage",
        })
        .then((res) => {
          console.log(res);
          let token = res.data.key;
          localStorage.setItem("token", token);
          this.dispatch("getUserInfo");
          this.dispatch("socketConnect", {
            token: token,
            type: 0 // 알람 소켓
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    kakaoLogin(context, accessToken) {
      http
        .post("/accounts/kakao/", {
          token: accessToken,
          redirect_uri: "http://127.0.0.1:8000/accounts/kakao/callback/",
        })
        .then((res) => {
          let token = res.data.key;
          localStorage.setItem("token", token);
          this.dispatch("getUserInfo");
          this.dispatch("socketConnect", {
            token: token,
            type: 0 // 알람 소켓
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendAlarm(context, payload) {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "X-CSRFToken": "token",
          "Content-Type": "application/json",
        },
      };
      let body = {
        message: payload.message,
        articleUserId: payload.articleUserId,
        articleId: payload.articleId,
        thumbnailPath: payload.thumbnailPath,
        username: this.state.userInfo.username,
        alarmType: payload.alarmType
      }
      http
        .post(payload.url, body, config)
        .then((res) => {
          console.log(res);
          return;
        }).catch(err => {
          console.log(err)
          return;
        })
    },
    checkSocket({ dispatch, commit }, context) {
      let socket = this.state.socket
      // 소켓 닫혀있는 경우
      if (socket == null) {
        let token = localStorage.getItem("token");
        this.dispatch("socketConnect", {
          token: token,
          type: 0 // 알람 소켓
        });
      }
    },
    socketConnect({ commit, context }, payload) {
      const SERVER_URL = "wss://i3b307.p.ssafy.io"
      // ws://127.0.0.1:8000
      // wss://i3b307.p.ssafy.io
      if (payload.type == 0) {
        var socket = new WebSocket(`${SERVER_URL}/ws/test/${payload.token}`);
      }
      else {
        var chatSocket = this.state.chatSocket;
        if (chatSocket == null) {
          var socket = new WebSocket(`${SERVER_URL}/ws/chat/${payload.token}/room_${payload.room}`);
        }
        else if (chatSocket.url.split('/')[6] != `room_${payload.room}`) {
          chatSocket.close()
          var socket = new WebSocket(`${SERVER_URL}/ws/chat/${payload.token}/room_${payload.room}`);
        }
      }

      if (socket) {
        socket.onmessage = function (res) {
          console.log(res)
          var msg = JSON.parse(res.data);
          if (payload.type == 0) {
            commit("setAlarms", 1)
          }
          else {
            // 채팅
            document.querySelector('#chat-log').value += (msg.username + ': ' + msg.message + '\n');
            console.log(msg)
          }
        };
  
        socket.onopen = function (e) {
          console.log(e);
        };
  
        socket.onclose = function (e) {
          console.log(e);
        };
  
        if (socket.readyState < 2) {
          if (payload.type == 0) {
            this.commit("setSocket", socket)
          }
          else {
            this.commit("setChatSocket", socket)
          }
        }
      }
    },
    alarmReset({ commit }) {
      commit("resetAlarms");
    },
  },
});
