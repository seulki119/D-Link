<template>
  <div>
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <!-- <v-img :src="item.user.image"></v-img> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.user.username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>s
      <v-img :src="`//127.0.0.1:8000/${item.image}`" height="300"></v-img>

      <v-card-text>
        <div class="scrapInfo">
          {{ item.scrap.length }}
          <img
            v-if="!item.scrap.includes(userId)"
            class="scrapInfo"
            @click="scrapAct(item.id)"
            :src="(scrapSrc = scrapNo)"
          />
          <img v-else class="scrapInfo" @click="scrapAct(item.id)" :src="(scrapSrc = scrapYes)" />
        </div>
      </v-card-text>
      <!-- content는 45자까지만 보여주고, 더보기 클릭시 전체 보여줌 -->
      <v-card-text style="color:black">
        <span v-if="!readMoreActivated">{{ item.content.slice(0, 45) }}</span>
        <a style="color:gray;" class v-if="!readMoreActivated" @click="activateReadMore">...더보기</a>
        <span v-if="readMoreActivated" v-html="item.content"></span>
      </v-card-text>
      <v-card-text>{{ item.hashTag }}</v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
          @click.native="show = !show"
          v-if="item.commentSet.length > 0"
        >
          {{
          show ? "댓글 접기" : `댓글 ${item.commentSet.length}개 모두 보기`
          }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <!-- 본인댓글이나 최신댓글 1개 보여주기 -->
      <v-slide-y-transition v-if="item.commentSet.length > 0 && showComment.content != ''">
        <v-card-text v-show="!show">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ showComment.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ showComment.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-slide-y-transition>
      <!-- 댓글 모두보기 -->
      <v-slide-y-transition v-if="item.commentSet !== undefined && item.commentSet.length > 0">
        <v-card-text v-show="show">
          <!--  -->
          <v-list-item v-for="(comment, index) in item.commentSet" :key="index">
            <v-list-item-avatar color="grey">
              <!-- <v-img :src="comment.user.image"></v-img> -->
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-btn
              v-show="comment.user.id == userId"
              text
              color="deep-purple accent-4"
              @click="updateComment(comment.id)"
            >수정</v-btn>-->

            <!-- snackbar : 대댓글달기, 댓글 삭제 -->
            <v-btn text color="deep-purple accent-2" @click="snackbar = true">:</v-btn>
            <v-snackbar v-model="snackbar" :vertical="!vertical">
              {{ text }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="deep-purple accent-2"
                  v-bind="attrs"
                  @click="deleteComment(comment.id)"
                >삭제</v-btn>

                <v-btn text color="deep-purple accent-2" v-bind="attrs" @click="snackbar = false">X</v-btn>
              </template>
            </v-snackbar>
          </v-list-item>
        </v-card-text>
      </v-slide-y-transition>
      <!-- 댓글 등록하기 -->
      <v-card-actions>
        <v-avatar color="grey" size="30px"></v-avatar>
        <v-spacer></v-spacer>
        <v-textarea
          v-model="myComment"
          auto-grow
          outlined
          filled
          rows="1"
          row-height="15"
          :placeholder="`${userName} 님의 댓글`"
          style="width: 270px"
          append-icon="mdi-comment"
          @keydown.enter="createComment()"
        ></v-textarea>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";

export default {
  computed: {
    ...mapGetters(["item"]),
    ...mapGetters(["userId"]),
    ...mapGetters(["userName"])
  },
  data: function() {
    return {
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png",
      readMoreActivated: false,
      show: false,
      showComment: { username: "", content: "" },
      myComment: "",
      snackbar: false,
      text: "Lorem ipsum dolor sit amet",
      vertical: true
    };
  },
  created() {
    // article id로 게시물정보 가져오기.
    this.$store.dispatch("getArticle", `/articles/${this.$route.query.id}`);

    let array = this.item.commentSet;

    console.log(array);
    if (array !== undefined) {
      for (let index = 0; index < array.length; index++) {
        if (array[index].user.id === this.userId) {
          this.showComment.username = array[index].user.username;
          this.showComment.content = array[index].content;
          break;
        } else if (index == array.length - 1) {
          this.showComment.username = array[index].user.username;
          this.showComment.content = array[index].content;
        }
      }
    }
  },
  methods: {
    scrapAct(id) {
      this.$store.dispatch("doScrap", {
        url: `/articles/${id}/scrap`,
        page: "article",
        id: `${id}`
      });
    },
    activateReadMore() {
      this.readMoreActivated = true;
    },
    // 댓글 등록
    createComment() {
      // alert(this.myComment);
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      const fd = new FormData();
      fd.append("user", this.userId);
      fd.append("content", this.myComment);

      http
        .post(`/articles/${this.item.id}/comment/`, fd, config)
        .then(response => {
          console.log(response);
          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );
          this.myComment = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    //댓글삭제
    deleteComment(commId) {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      // const fd = new FormData();
      // // fd.append("user", this.userId);
      // fd.append("content", "수정");

      http
        .delete(`/articles/${this.item.id}/comment/${commId}/`, config)
        .then(response => {
          console.log(response);
          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>
