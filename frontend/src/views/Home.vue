<!-- eslint-disable -->
<template>
  <v-app id="inspire">
    <v-main v-if="!isLogin">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>DLINK에 오신걸 환영합니다</v-toolbar-title>
              </v-toolbar>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon router :to="{ name:'login' }">
                  <span>로그인</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon router :to="{ name:'signup' }">
                  <span>회원가입</span>
                </v-btn>
                <v-spacer></v-spacer>
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
export default {
  props: {
    source: String
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
