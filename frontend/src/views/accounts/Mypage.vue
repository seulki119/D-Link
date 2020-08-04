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
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-row class="pa-5" no-gutters>
        <v-col>
          <v-avatar class="profileImage" color="grey" size="80" round>
            <v-img src="image"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-row>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{username}}</v-list-item-title>
                <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <span>{{intro}}</span>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-col>
      </v-row>
      <v-btn block color="black" class="ma-2 white--text" @click="update()">
        <v-icon left dark>mdi-account</v-icon>프로필 수정
      </v-btn>
      <v-btn block color="black" class="ma-2 white--text" @click="logout()">
        <v-icon left dark>mdi-logout</v-icon>로그아웃
      </v-btn>
      <v-divider></v-divider>

      <v-card>
        <v-tabs centered icons-and-text background-color="white" color="deep-purple accent-4">
          <v-tab>업로드한 게시물</v-tab>
          <v-tab>스크랩한 게시물</v-tab>
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <v-col v-for="n in articleSet" :key="n.image" cols="4">
                  <v-img
                    :src="`//127.0.0.1:8000/${n.image}`"
                    class="grey lighten-2 pa-1"
                    aspect-ratio="1"
                    @click="showDetail(n.id)"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <v-col v-for="n in scrapSet" :key="n.image" cols="4">
                  <v-img
                    :src="`//127.0.0.1:8000/${n.image}`"
                    class="grey lighten-2 pa-1"
                    aspect-ratio="1"
                    @click="showDetail(n.id)"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      this.scrapSet = res.data.scrapSet;
      this.id = res.data.id;
      this.image = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = this.userInfo.email;
      console.log(this.userInfo);
    });
    // console.log(this.articleSet);
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["logout"]),
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    update() {
      this.$router.push("updateuser");
    }
  }
};
</script>
