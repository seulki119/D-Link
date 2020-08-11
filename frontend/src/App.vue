<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      v-if="!isSearch && isLogin"
      color="indigo"
      dark
      max-width="600"
      min-width="300"
      elevate-on-scroll
      class="mx-auto"
    >
      <v-btn icon class="mx-auto" v-if="canBack" @click="$router.go(-1)">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-icon>mdi-history</v-icon>
        <!-- <p>뒤로가기</p> -->
        <!-- </div> -->
      </v-btn>
      <v-btn icon class="mx-auto" v-else disabled>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <div icon class="mx-auto">
        <v-icon>D L I N K</v-icon>
        <!-- <p>로고</p> -->
      </div>

      <v-btn icon class="mx-auto" router :to="{ name: 'notifications' }">
        <v-badge color="red" left overlap>
          <span slot="badge">{{alarms.length}}</span>
          <v-icon>mdi-mail</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer class="pa-0" app style=" background-color:transparent">
      <v-bottom-navigation
        v-if="isLogin"
        grow
        color="teal"
        dark
        max-width="600"
        min-width="300"
        class="mx-auto"
      >
        <v-btn icon router :to="{ name: 'articlelist' }">
          홈
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'search' }">
          검색
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn prepend-icon="mdi-plus" icon router :to="{ name: 'createArticle' }">
          업로드
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon>
          컨텐츠
          <v-icon>mdi-dialpad</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'mypage' }">
          마이페이지
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    canBack: true,
    isSearch: false
  }),
  computed: {
    ...mapState(["isLogin"]),
    ...mapState(["alarms"])
  },
  beforeUpdate() {
    this.canBack = true;
    let currentUrl = this.$router.history.current.name;
    let baseUrl = [
      "home",
      "login",
      "signup",
      "taste",
      "mypage",
      "articlelist",
      "passwordChange",
      "search"
    ];
    // console.log(this.$router.options.routes);
    // console.log(this.$router.history.current.name);
    if ("search" === this.$router.history.current.name) {
      this.isSearch = true;
    } else {
      this.isSearch = false;
      for (let i = 0; i < baseUrl.length; i++) {
        if (baseUrl[i] === currentUrl) {
          this.canBack = false;
          return;
        }
      }
    }
  }
};
</script>
