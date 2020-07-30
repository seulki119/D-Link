<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      v-if="isLogin"
      color="indigo"
      dark
      max-width="600"
      min-width="300"
      elevate-on-scroll
      class="mx-auto"
    >
      <v-btn class="mx-auto" v-if="canBack" icon @click="$router.go(-1)">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-icon>mdi-history</v-icon>
        <!-- <p>뒤로가기</p> -->
        <!-- </div> -->
      </v-btn>
      <div class="d-flex flex-column align-center">
        <v-icon>일단 여기다가 로고나 넣자 !</v-icon>
        <!-- <p>로고</p> -->
      </div>
      <v-btn class="mx-auto" icon router :to="{ name: 'mypage' }">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-icon>mdi-account</v-icon>
        <!-- <p>마이페이지</p> -->
        <!-- </div> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer class="pa-0">
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
        <v-btn icon router :to="{ name: 'articlelist' }">
          검색
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn prepend-icon="mdi-plus" icon router :to="{ name: 'createArticle' }">
          파일 업로드
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon>
          컨텐츠
          <v-icon>mdi-dialpad</v-icon>
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
    canBack: true
  }),
  computed: {
    ...mapState(["isLogin"])
  },
  beforeUpdate() {
    this.canBack = true;
    let currentUrl = this.$router.history.current.name;
    let baseUrl = this.$router.options.routes;
    console.log(this.$router.options.routes);
    console.log(this.$router.history.current.name);
    for (let i = 0; i < 6; i++) {
      if (baseUrl[i].name === currentUrl) {
        this.canBack = false;
        return;
      }
    }
  }
};
</script>
