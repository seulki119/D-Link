<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-app-bar v-if="isLogin" app grow color="indigo" dark>
      <v-btn icon router :to="{ name: 'home' }">
        <v-icon>mdi-history</v-icon>
        <span>홈</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="$store.dispatch('logout')">
        <v-icon>mdi-heart</v-icon>
        <span>로그아웃</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon router :to="{ name: 'mypage' }">
        <v-icon>mdi-map-marker</v-icon>
        <span>마이페이지</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation v-if="isLogin" grow color="teal">
      <v-btn icon router :to="{ name: 'articlelist' }">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon router :to="{ name: 'createArticle' }">
        <span>파일 업로드</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>
