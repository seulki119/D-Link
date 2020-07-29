<template>
  <div>
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{
            item.user.username
            }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-img :src="`//127.0.0.1:8000/${item.image}`" height="194"></v-img>

      <v-card-text>
        <div style="float:right;">
          {{ item.scrap.length }}
          <img style="cursor: pointer;" :src="scrapSrc" @click="scrapAct()" />
        </div>
      </v-card-text>
      <!-- content는 60자까지만 보여주고, 더보기 클릭시 전체 보여줌 -->
      <v-card-text>
        {{ item.content }}
        <p>더보기</p>
      </v-card-text>
      <v-card-text>{{ item.hashTag }}</v-card-text>

      <v-card-actions>
        <!-- v-if 댓글.length > 0 -->
        <v-btn text color="deep-purple accent-4">댓글 모두보기</v-btn>
        <v-spacer></v-spacer>
        <!-- 본인댓글이나 최신댓글 1개 보여주기 -->
        <v-card-text>{{ item.comment }}</v-card-text>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import http from "@/util/http-common";
import { mapGetters } from "vuex";
// import http from "@/util/http-common";

export default {
  computed: {
    ...mapGetters(["item"])
  },
  data: function() {
    return {
      scrapSrc: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png"
    };
  },
  created() {
    // article id로 게시물정보 가져오기.
    this.$store.dispatch("getArticle", `/articles/${this.$route.query.id}`);

    // http.get(`articles/${this.$route.query.id}`).then((response) => {
    //   console.log(response);
    //   this.id = response.data.id;
    //   this.user.id = response.data.user.id;
    //   this.user.username = response.data.user.username;
    //   this.user.image = response.data.user.image;
    //   this.image = response.data.image;
    //   this.hashTag = response.data.hashTag;
    //   this.content = response.data.content;
    //   this.scrap = response.data.scrap;
    //   console.log(this.image);
    // });
  },
  methods: {
    scrapAct() {
      this.$store.dispatch(
        "createComment",
        `/articles/${this.$route.query.id}/scrap`
      );

      // scrap배열안에 state.userinfo.userid or getters[userid]가 있는지 확인하고
      // 아이콘 src 정해주기.
      // if (this.item.scrap.include()) {
      this.scrapSrc =
        "https://img.icons8.com/plasticine/24/000000/wine-glass.png";
      // }
    }
  }
};
</script>
