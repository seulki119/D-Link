<!-- eslint-disable -->
<!--
1. 회원 아이디 기반으로 정보 가져오기
2. 회원이 스크랩한 게시물 목록
3. 회원이 업로드한 게시물 목록
4. 회원정보 관련 버튼(disabled 처리)
      - 수정
        -탈퇴
      - 로그아웃

-->
<template>
  <v-container style="max-width:450px">
    <v-card class="pa-5" max-width="400" min-width="300">
      <v-row no-gutters align="end" class="fill-height">
        <v-col class="pa-0">
          <v-avatar class="profileImage" color="grey" size="80" round>
            <v-img src="image"></v-img>
          </v-avatar>
        </v-col>
        <v-col align="center" cols="20">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{username}}</v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import http from "@/util/http-common";
export default {
  data() {
    return {
      email: "",
      articleSet: [],
      id: "",
      image: "",
      intro: "",
      scrapSet: [],
      username: ""
    };
  },
  created() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/accounts/{temp}/", "", config).then(res => {
      this.articleSet = res.data.articleSet;
      this.id = res.data.id;
      this.image = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = this.userInfo.email;
    });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    print() {}
  }
};
</script>
