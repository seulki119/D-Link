<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      v-if="!isSearch && isLogin"
      max-width="600"
      min-width="300"
      elevate-on-scroll
      class="mx-auto"
    >
      <v-btn icon class="mx-auto" v-if="canBack" @click="$router.go(-1)">
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn icon class="mx-auto" v-else disabled>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <div icon class="mx-auto">
        <v-icon>D L I N K</v-icon>
      </div>
      <v-btn icon class="mx-auto" router :to="{ name: 'notifications' }">
        <v-badge left overlap>
          <span slot="badge">{{alarms}}</span>
          <v-icon>mdi-mail</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <div style="height:36px">
      <v-bottom-navigation
        v-if="isLogin"
        center
        max-width="600"
        min-width="300"
        class="mx-auto"
        style="position: fixed;
  left: 0;
  right: 0;"
      >
        <v-btn icon router :to="{ name: 'articlelist' }">
          <span>홈</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'search' }">
          <span>검색</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn prepend-icon="mdi-plus" icon router :to="{ name: 'createArticle' }">
          <span>업로드</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'contentlist' }">
          <span>컨텐츠</span>
          <v-icon>mdi-dialpad</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'mypage' }">
          <span>MY</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
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
