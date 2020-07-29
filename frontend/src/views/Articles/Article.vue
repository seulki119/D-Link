<template>
  <div>
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            user.username
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-img :src="`//127.0.0.1:8000/${image}`" height="194"></v-img>

      <v-card-text>
        <div style="float:right;">
          {{ scrap.length }}
          <img
            style="cursor: pointer;"
            src="@/assets/turned_in_not-24px.svg"
            alt
          />
        </div>
      </v-card-text>
      <!-- content는 60자까지만 보여주고, 더보기 클릭시 전체 보여줌 -->
      <v-card-text
        >{{ content }}
        <p>더보기</p>
      </v-card-text>
      <v-card-text>{{ hashTag }}</v-card-text>

      <v-card-actions>
        <!-- v-if 댓글.length > 0 -->
        <v-btn text color="deep-purple accent-4">댓글 모두보기</v-btn>
        <v-spacer></v-spacer>
        <!-- 본인댓글이나 최신댓글 1개 보여주기 -->
        <v-card-text>{{ replies }}</v-card-text>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  data: function() {
    return {
      id: "",
      user: {
        id: "",
        username: "",
        image: "",
      },
      image: "",
      hashTag: "",
      content: "",
      scrap: [],
      // replies: {},
    };
  },
  created() {
    // this.id = this.$route.query.id;
    // console.log(this.id);
    // 백엔드에서 해당id로 게시물정보 가져오기.
    http.get(`articles/${this.$route.query.id}`).then((response) => {
      console.log(response);
      this.id = response.data.id;
      this.user.id = response.data.user.id;
      this.user.username = response.data.user.username;
      this.user.image = response.data.user.image;
      this.image = response.data.image;
      this.hashTag = response.data.hashTag;
      this.content = response.data.content;
      this.scrap = response.data.scrap;
      console.log(this.image);
    });
  },
};
</script>
