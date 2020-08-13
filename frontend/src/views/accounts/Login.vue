<!-- eslint-disable -->
<template>
  <v-container class="fill-height" style="max-width:450px">
    <v-row align-center row wrap>
      <v-flex xs12>
        <v-alert class="mb-3" :value="isLoginError" type="error">이메일과 비밀번호를 확인해주세요.</v-alert>
        <v-alert :value="isLogin" type="success">로그인에 성공하였습니다.</v-alert>
        <v-card>
          <v-toolbar flat justify-space-between>
            <v-toolbar-title>로그인</v-toolbar-title>
            <v-spacer></v-spacer>
            <button @click="getAuth()" class="mx-1">
              <img src="@/assets/google.png" alt="구글로그인버튼" style="width:30px" />
            </button>
            <KakaoLogin
              class="mx-1"
              api-key="20b828e1eee0b26f49e9d6200fcae186"
              :on-success="onSuccess"
              :on-failure="onFailure"
            />
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="email" label="이메일을 입력하세요"></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              @keypress.enter="login({email,password})"
              label="비밀번호를 입력하세요"
            ></v-text-field>
            <v-btn color="primary" depressed block large @click="login({email,password})">로그인</v-btn>
            <hr style="border: solid 0.5px grey; margin: 5px;" />
          </div>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import KakaoLogin from "vue-kakao-login";
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  components: {
    KakaoLogin
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"])
  },
  mounted() {
    console.log(document.getElementById("kakao-login-btn").firstChild);
    document.getElementById("kakao-login-btn").firstChild.src =
      "/static/img/kakao_login_button_round.55b2ddfe.png";
    document.getElementById("kakao-login-btn").firstChild.style.width = "30px";
  },
  methods: {
    ...mapActions(["login"]),
    getAuth() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          this.$store.dispatch("googleLogin", authCode);
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSuccess(data) {
      console.log(data);
      console.log("success");
      this.$store.dispatch("kakaoLogin", data.access_token);
    },
    onFailure(data) {
      console.log(data);
      console.log("failure");
    }
  }
};
</script>