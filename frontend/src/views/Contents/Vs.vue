<template>
  <v-container>2개의 사진을 보여주고 선택시 밑에 투표수 퍼센트지 출력예정</v-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      imgA: "",
      imgB: "",
      topicA: "",
      topicB: "",
      createdAt: ""
    };
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http
      .get("versus", config)
      .then(res => {
        console.log(res);
        //res에 따라서 data에 값 리턴하기
        //this.imgA = res.data.image_A; 이런식
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {}
};
</script>

<style>
</style>