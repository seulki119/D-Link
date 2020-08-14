<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-toolbar dark flat>
        <v-toolbar-title>당신의 선택은?</v-toolbar-title>
      </v-toolbar>
      <v-row class="justify-center mx-auto">
        <v-radio-group v-model="choice">
          <v-layout row class="align-end">
            <v-flex column>
              <v-img :src="`//i3b307.p.ssafy.io/${image_A}`" class="grey lighten-2 ma-3"></v-img>
              <v-radio value="1" class="text-center"></v-radio>
            </v-flex>
            <v-flex column>
              <v-img :src="`//i3b307.p.ssafy.io/${image_B}`" class="grey lighten-2 ma-3"></v-img>
              <v-radio value="2"></v-radio>
            </v-flex>
          </v-layout>
        </v-radio-group>
      </v-row>
      <v-divider></v-divider>
      <v-row>dafasdfads</v-row>
    </v-card>
  </v-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      image_A: "",
      image_B: "",
      topic_A: "",
      topic_B: "",
      createdAt: "",
      select_A: [],
      select_B: [],
      selected: false
    };
  },
  created() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http
      .get("versus", config)
      .then(res => {
        let data = res.data[0];
        this.createdAt = data.createdAt;
        this.image_A = data.image_A;
        this.image_B = data.image_B;
        this.topic_A = data.topic_A;
        this.topic_B = data.topic_B;
        console.log(this.image_A);
        let userId = this.$store.getters.userId;
        if (data.select_A.includes(userId) || data.select_B.includes(userId)) {
          this.selected = true;
          console.log("이미 선택함");
        } else {
          console.log(userId);
          console.log("아직 선택안함");
        }
        this.loading = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .get("versus", config)
        .then(res => {
          let data = res.data[0];
          this.createdAt = data.createdAt;
          this.image_A = data.image_A;
          this.image_B = data.image_B;
          console.log(this.image_A);
          let userId = this.$store.getters.userId;
          if (
            data.select_A.includes(userId) ||
            data.select_B.includes(userId)
          ) {
            this.selected = true;
            console.log("이미 선택함");
          } else {
            console.log(userId);
            console.log("아직 선택안함");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.v-radio {
  text-align: center;
  display: block;
}
</style>