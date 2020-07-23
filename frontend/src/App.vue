<template>
  <v-app id="inspire">
    <v-app-bar v-if="isLogin" app grow color="indigo" dark>
      <v-btn icon router :to="{name:'home'}">
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon router :to="{name:'login'}">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation v-if="isLogin" :value="activeBtn" grow color="teal">
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heardt</v-icon>
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
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>