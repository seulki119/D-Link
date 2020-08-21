<template>
  <div v-if="!loading">
    <v-snackbar v-model="snackbar" :color="color" :top="y === 'top'" :timeout="timeout">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="item.user.image != null" :src="`//i3b307.p.ssafy.io/${item.user.image}`"></v-img>
          <v-img v-if="item.user.image == null" :src="require(`@/assets/default_profile.svg`)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.user.username }}</v-list-item-title>
        </v-list-item-content>

        <!-- article menu : 글 작성자에게만 표시 -->
        <v-menu bottom left v-if="item.user.id == userId">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(menu, index) in articleMenu" :key="index" @click="clickMenu(menu)">
              <v-list-item-title>{{ menu }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-img :src="`//i3b307.p.ssafy.io/${item.image}`" class="max-small"></v-img>

      <div v-if="!modeUpdate">
        <v-card-text>
          <div class="scrapInfo">
            <img
              style="cursor: pointer;float:right;"
              v-if="!item.scrap.includes(userId)"
              class="scrapInfo"
              @click="scrapAct(item.id, item.user.id, item.image)"
              :src="(scrapSrc = scrapNo)"
            />
            <img
              v-else
              class="scrapInfo"
              @click="scrapAct(item.id)"
              style="cursor: pointer;float:right;"
              :src="(scrapSrc = scrapYes)"
            />
            <span style="font-size:1.3em;float:right">{{ item.scrap.length }}</span>
          </div>
        </v-card-text>
        <v-card-text>
          <span v-if="!readMoreActivated">{{ item.content.slice(0, 45) }}</span>
          <a
            class
            v-if="item.content.length>45 && !readMoreActivated"
            @click="activateReadMore"
          >...더보기</a>
          <span v-if="readMoreActivated" v-html="item.content"></span>
        </v-card-text>
        <v-card-text>
          <v-combobox class="pt-6" v-model="hashtags" multiple chips disabled></v-combobox>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click.native="show = !show" v-if="item.commentSet.length > 0">
            {{
            show ? "댓글 접기" : `댓글 ${item.commentSet.length}개 모두 보기`
            }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-slide-y-transition v-if="item.commentSet.length > 0 || repComment.id !== '' ">
          <v-card-text v-show="!show">
            <v-list-item>
              <v-list-item-avatar v-if="repComment.userImage != ''">
                <v-img :src="`//i3b307.p.ssafy.io/${repComment.userImage}`"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ repComment.userName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{
                  repComment.content
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-slide-y-transition>
        <v-slide-y-transition v-if="item.commentSet !== undefined && item.commentSet.length > 0">
          <v-card-text v-show="show">
            <v-list-group v-for="(comment, index) in item.commentSet" :key="index">
              <template v-slot:activator>
                <v-list-item-avatar>
                  <v-img
                    v-if="comment.user.image != null"
                    :src="`//i3b307.p.ssafy.io/${comment.user.image}`"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
                  {{ comment.content }}
                </v-list-item-content>
              </template>
              <v-list-item>
                <v-list-item-content>
                  <div>
                    <span
                      @click="myComment = `@${comment.user.username} `; modeComment=false; comm={id:comment.id,username:comment.user.username,userid:comment.user.id}"
                      class="commentMenu"
                    >답글달기</span>
                    <span
                      v-show="item.user.id == userId || comment.user.id == userId"
                      @click="deleteComment(comment.id);"
                      class="commentMenu"
                    >삭제</span>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <div v-if="comment.recommentSet !== undefined">
                <comment-form
                  :comments="comment.recommentSet"
                  :itemUserId="item.user.id"
                  :userId="userId"
                  :commentId="comment.id"
                />
              </div>
            </v-list-group>
          </v-card-text>
        </v-slide-y-transition>
        <v-card-actions>
          <v-textarea
            v-model="myComment"
            auto-grow
            outlined
            filled
            rows="1"
            row-height="15"
            :placeholder="`${userName} 님의 댓글`"
            :modeComment="modeComment"
            append-icon="mdi-comment"
            @click:append="modeComment ?  createComment() : createRecomment()"
            @keydown.enter="modeComment ?  createComment() : createRecomment()"
            maxlength="80"
            counter="80"
          ></v-textarea>
        </v-card-actions>
      </div>
      <div v-else>
        <v-card-text>
          <v-textarea v-model="content" label="내용" counter maxlength="120" full-width single-line></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-combobox
            class="pt-6"
            v-model="hashtags"
            :items="items"
            label="태그 입력하세요"
            :maxlength="max"
            @keypress="isNotSpecial"
            multiple
            chips
            dense
          ></v-combobox>
        </v-card-text>
        <v-divider></v-divider>
        <v-btn class="ma-2" @click="modeUpdate = !modeUpdate; content = item.content">
          <v-icon left>mdi-arrow-left</v-icon>back
        </v-btn>
        <v-btn style="float:right" class="ma-2" @click="actUpdate()">
          upload
          <v-icon right>mdi-cloud-upload</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
  <div class="overlay" v-else>로딩중</div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";
import CommentForm from "@/views/Articles/CommentForm.vue";

export default {
  components: {
    CommentForm
  },
  computed: {
    ...mapGetters(["item"]),
    ...mapGetters(["userId"]),
    ...mapGetters(["userName"])
  },
  data: function() {
    return {
      loading: false,
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png",
      readMoreActivated: false,
      show: false,
      repComment: { id: "", userName: "", content: "", userImage: "" },
      myComment: "",

      hashtags: [],
      articleMenu: ["수정", "삭제"],
      socket: null,
      comm: {
        id: "",
        username: ""
      },
      modeComment: true,
      modeUpdate: false,
      content: "",
      items: [],
      max: 20,
      comments: [],
      snackbar: false,
      snackbarMessage: "",
      y: "top",
      color: "",
      timeout: 2000
    };
  },
  watch: {
    myComment() {
      if (this.myComment == "") {
        this.modeComment = true;
      }
    }
  },
  created() {
    this.loading = true;

    this.$store
      .dispatch("getArticle", `/articles/${this.$route.query.id}`)
      .then(res => {
        console.log(res);
        if (res === undefined) {
          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );
        }
      })
      .finally(() => {
        setTimeout(() => {
          let array = this.item.commentSet;
          if (array !== undefined) {
            for (let index = array.length - 1; index >= 0; index--) {
              if (index == array.length - 1) {
                this.repComment.id = array[index].id;
                this.repComment.userName = array[index].user.username;
                this.repComment.content = array[index].content;
                this.repComment.userImage = array[index].user.image;
              }

              if (array[index].user.id === this.userId) {
                this.repComment.id = array[index].id;
                this.repComment.userName = array[index].user.username;
                this.repComment.content = array[index].content;
                this.repComment.userImage = array[index].user.image;
                break;
              }
            }
          }
          this.comments = array;
          this.content = this.item.content;

          let tagArray = this.item.hashtag;
          let tmp = [];
          for (let index = 0; index < tagArray.length; index++) {
            tmp.push(tagArray[index].tag);
          }
          this.hashtags = tmp;
          this.loading = false;
        }, 400);
      });
  },

  methods: {
    scrapAct(id, articleUserId, thumbnailPath) {
      this.$store.dispatch("doScrap", {
        url: `/articles/${id}/scrap`,
        page: "article",
        id: `${id}`
      });
      if (articleUserId) {
        this.$store.dispatch("sendAlarm", {
          url: "/alarms/Share/",
          articleUserId: `${articleUserId}`,
          articleId: `${id}`,
          thumbnailPath: `${thumbnailPath}`,
          message: "",
          alarmType: 0 // 스크랩
        });
      }
    },
    activateReadMore() {
      this.readMoreActivated = true;
    },
    createComment() {
      this.$store.dispatch("sendAlarm", {
        url: "/alarms/Share/",
        articleUserId: `${this.item.user.id}`,
        articleId: `${this.item.id}`,
        thumbnailPath: `${this.item.image}`,
        message: this.myComment,
        alarmType: 1 // 댓글
      });
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
          this.color = "success";
          this.snackbarMessage = "성공적으로 생성되었습니다.";
          this.snackbar = true;

          this.repComment.id = response.data.id;
          this.repComment.userName = this.userName;
          this.repComment.content = response.data.content;
          this.repComment.userImage = response.data.user.image;
          // }

          this.myComment = "";
        })
        .catch(err => {
          console.log(err);
          this.color = "error";
          this.snackbarMessage = "에러가 발생했습니다.";
          this.snackbar = true;
        });
    },
    deleteComment(commId) {
      console.log(commId);

      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      http
        .delete(`/articles/${this.item.id}/comment/${commId}/`, config)
        .then(() => {
          this.color = "success";
          this.snackbarMessage = "정상적으로 삭제되었습니다.";
          this.snackbar = true;
          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );

          if (this.repComment.id == commId) {
            this.repComment.id = "";
            this.repComment.userName = "";
            this.repComment.content = "";
            this.repComment.userImage = "";
          }
          // if(commId)
          this.color = "success";
          this.snackbarMessage = "성공적으로 삭제되었습니다.";
          this.snackbar = true;
        })
        .catch(err => {
          console.log(err.response);
          this.color = "error";
          this.snackbarMessage = "에러가 발생했습니다.";
          this.snackbar = true;
        });
    },
    clickMenu(menu) {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      if (menu === "삭제") {
        http
          .delete(`/articles/${this.item.id}`, config)
          .then(() => {
            let snackbarData = {
              color: "success",
              snackbarMessage: "정상적으로 삭제되었습니다.",
              snackbar: true
            };
            this.$store.commit("setSnackbar", snackbarData);
            this.$router.push("mypage");
          })
          .catch(response => {
            alert(response.data.message);
          });
      } else {
        this.modeUpdate = true;
        http.post("/articles/hashtag/", "", config).then(res => {
          let tmp = [];

          for (let t in res.data) {
            tmp.push(res.data[t].tag);
          }
          this.items = tmp;
        });
      }
    },
    actUpdate() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      let tags = [];
      for (var t in this.hashtags) {
        tags += "#";
        tags += this.hashtags[t];
      }

      const fd = new FormData();
      fd.append("content", this.content);
      fd.append("hashtags", tags);

      http
        .put(`/articles/${this.item.id}/`, fd, config)
        .then(res => {
          console.log(res);
          this.modeUpdate = !this.modeUpdate;
          this.item.content = this.content;
          this.color = "success";
          this.snackbarMessage = "정상적으로 수정되었습니다.";
          this.snackbar = true;
        })
        .catch(err => {
          console.log(err.response);
          this.color = "error";
          this.snackbarMessage = "에러가 발생했습니다.";
          this.snackbar = true;
        });
    },
    isNotSpecial($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (
        (keyCode >= 123 && keyCode <= 130) ||
        (keyCode >= 32 && keyCode <= 47) ||
        (keyCode >= 58 && keyCode <= 64) ||
        (keyCode >= 91 && keyCode <= 96)
      ) {
        $event.preventDefault();
      }
    },
    //대댓글 생성
    createRecomment() {
      this.$store.dispatch("sendAlarm", {
        url: "/alarms/Share/",
        articleUserId: `${this.comm.userid}`,
        articleId: `${this.item.id}`,
        thumbnailPath: `${this.item.image}`,
        message: this.myComment,
        alarmType: 2 // 대댓글
      });
      //
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
        .post(`/articles/comment/${this.comm.id}/recomment/`, fd, config)
        .then(response => {
          console.log(response);
          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );
          this.myComment = "";
          this.color = "success";
          this.snackbarMessage = "성공적으로 생성되었습니다.";
          this.snackbar = true;
        })
        .catch(response => {
          console.log(response.data);
        });
    },
    reply() {
      alert("!");
    }
  }
};
</script>
<style scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  /* color: #ffffff; */
}
.commentMenu {
  float: right;
  font-size: small;
  cursor: pointer;
  margin-left: 8px;
}
.max-small {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 350px;
}
</style>