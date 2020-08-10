<!-- eslint-disable -->
<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-row no-gutters>
        <v-col>
          <v-avatar class="profileImage" color="grey" size="80" round>
            <v-img v-if="image!==null" :src="`//i3b307.p.ssafy.io/${image}`"></v-img>
            <span v-else>이미지를 추가해주세요!</span>
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
        <v-icon left dark>mdi-logout</v-icon>테스트용 로그아웃(진짜 로그아웃은 숨겨둠)
      </v-btn>
    </v-card>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-tabs centered icons-and-text background-color="white" color="deep-purple accent-4">
        <v-tab>업로드한 게시물</v-tab>
        <v-tab>스크랩한 게시물</v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="n in articleSet.slice().reverse()" :key="n.image" cols="4">
                <v-img
                  :src="`//i3b307.p.ssafy.io/${n.image}`"
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
              <v-col v-for="n in scrapSet.slice().reverse()" :key="n.image" cols="4">
                <v-img
                  :src="`//i3b307.p.ssafy.io/${n.image}`"
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
  beforeCreate() {
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
      console.log(res);
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
