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
          <span slot="badge">3</span>
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
        grow
        center
        color="teal"
        dark
        max-width="600"
        min-width="300"
        class="mx-auto"
        style="position: fixed;
  left: 0;
  right: 0;"
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
        <v-btn icon router :to="{ name: 'contentlist' }">
          컨텐츠
          <v-icon>mdi-dialpad</v-icon>
        </v-btn>
        <v-btn icon router :to="{ name: 'mypage' }">
          마이페이지
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
    ...mapState(["isLogin"])
  },
  beforeUpdate() {
    this.canBack = true;
    let currentUrl = this.$router.history.current.name;
    let baseUrl = this.$router.options.routes;
    // console.log(this.$router.options.routes);
    console.log(this.$router.history.current.name);
    if ("search" === this.$router.history.current.name) {
      this.isSearch = true;
    } else {
      this.isSearch = false;
      for (let i = 0; i < 6; i++) {
        if (baseUrl[i].name === currentUrl) {
          this.canBack = false;
          return;
        }
      }
    }
  }
};
</script>
