<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-app-bar
      v-if="isLogin"
      app
      grow
      color="indigo"
      dark
      max-width="600"
      min-width="300"
      class="mx-auto"
    >
      <!--    im so crazy -->
      <v-btn v-if="canBack" icon router @click="router.go(-1)">
        <v-icon left>mdi-history</v-icon>뒤로가기
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="$store.dispatch('logout')">
        <v-icon left>mdi-heart</v-icon>로그아웃
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon router :to="{ name: 'mypage' }">
        <v-icon left>mdi-map-marker</v-icon>마이페이지
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation v-if="isLogin" grow color="teal">
      <v-btn icon router :to="{ name: 'articlelist' }">
        Home
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon router :to="{ name: 'createArticle' }">
        파일 업로드
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        마이페이지
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
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
    canBack: false
  }),
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    back() {
      console.log(this.$router.options.routes);
    }
  }
};
</script>
