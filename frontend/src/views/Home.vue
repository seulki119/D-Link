<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-main v-if="!isLogin">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar v-if="!isLoginError" color="primary" dark flat>
                <v-toolbar-title>DLINK에 오신걸 환영합니다</v-toolbar-title>
              </v-toolbar>
              <v-alert class="mb-3" v-else type="error">이메일과 비밀번호를 확인해주세요.</v-alert>
              <v-card-actions>
                <v-tabs
                  centered
                  icons-and-text
                  background-color="white"
                  color="deep-purple accent-4"
                >
                  <v-tab>로그인</v-tab>
                  <v-tab>회원가입</v-tab>
                  <v-tab-item>
                    <login></login>
                  </v-tab-item>
                  <v-tab-item>
                    <sign-up></sign-up>
                  </v-tab-item>
                </v-tabs>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Login from "./accounts/Login.vue";
import SignUp from "./accounts/Signup.vue";
export default {
  props: {
    source: String
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"])
  },
  components: {
    Login: Login,
    SignUp: SignUp
  }
};
</script>
