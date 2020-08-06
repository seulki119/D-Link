<template>
  <div v-if="!loading">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-img v-if="item.user.image != null" :src="`//127.0.0.1:8000/${item.user.image}`"></v-img>
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
        <!-- article menu -->
      </v-list-item>
      <v-img :src="`//127.0.0.1:8000/${item.image}`" class="max-small"></v-img>

      <!-- 이미지 아래 부분 -->
      <div v-if="!modeUpdate">
        <!-- scrap field -->
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
        <!-- scrap field -->

        <!-- content는 45자까지만 보여주고, 더보기 클릭시 전체 보여줌 -->
        <v-card-text style="color:black">
          <span v-if="!readMoreActivated">{{ item.content.slice(0, 45) }}</span>
          <a
            style="color:gray;"
            class
            v-if="item.content.length>45 && !readMoreActivated"
            @click="activateReadMore"
          >...더보기</a>
          <span v-if="readMoreActivated" v-html="item.content"></span>
        </v-card-text>

        <!-- 해쉬태그 출력 -->
        <v-card-text>
          <v-combobox class="pt-6" v-model="hashtags" multiple chips disabled></v-combobox>
        </v-card-text>
        <!-- 댓글 접기/펼치기 버튼 -->
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
        <v-slide-y-transition v-if="item.commentSet.length > 0 && repComment!= null">
          <v-card-text v-show="!show">
            <v-list-item>
              <v-list-item-avatar color="grey">
                <v-img
                  v-if="repComment.userImage != null"
                  :src="`//127.0.0.1:8000/${repComment.userImage}`"
                ></v-img>
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
        <!-- 댓글 모두보기 -->
        <v-slide-y-transition v-if="item.commentSet !== undefined && item.commentSet.length > 0">
          <v-card-text v-show="show">
            <!-- 8/4 18:00 v-list-item에서 v-list-group으로 수정. https://vuetifyjs.com/en/components/lists/#lists -->
            <v-list-group v-for="(comment, index) in item.commentSet" :key="index">
              <template v-slot:activator>
                <v-list-item-avatar color="grey">
                  <v-img
                    v-if="comment.user.image != null"
                    :src="`//127.0.0.1:8000/${comment.user.image}`"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
                  {{ comment.content }}
                </v-list-item-content>
              </template>

              <!-- 대댓글달기, 삭제 버튼 ////START//// 
               댓글 삭제 - 권한 : 1)댓글 작성자 2)글 작성자
              -->
              <v-list-item>
                <v-list-item-content>
                  <div>
                    <span
                      @click="myComment = `@${comment.user.username} `; modeComment=false; comm={id:comment.id,username:comment.user.username}"
                      class="grey--text text--lighten-1 commentMenu"
                    >답글달기</span>
                    <span
                      v-show="item.user.id == userId || comment.user.id == userId"
                      @click="deleteComment(comment.id);"
                      class="grey--text text--lighten-1 commentMenu"
                    >삭제</span>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <!-- 대댓글달기, 삭제 버튼 ////END//// -->

              <!-- 대댓글 Form ////START//// -->
              <div v-if="comment.recommentSet !== undefined">
                <!-- props 전달 -->
                <comment-form
                  :comments="comment.recommentSet"
                  :itemUserId="item.user.id"
                  :userId="userId"
                  :commentId="comment.id"
                />
              </div>
              <!-- 대댓글 Form ////END//// -->
            </v-list-group>
          </v-card-text>
        </v-slide-y-transition>
        <!-- 댓글 등록하기 -->
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
            @keydown.enter="modeComment ?  createComment() : createRecomment()"
            maxlength="80"
            counter="80"
          ></v-textarea>
        </v-card-actions>
      </div>
      <!-- 이미지 아래 부분 -->

      <!-- 이미지 아래 부분 : 글 수정 모드 -->
      <div v-else>
        <!-- 글 내용 -->
        <v-card-text class="text--primary">
          <v-textarea v-model="content" label="내용" counter maxlength="120" full-width single-line></v-textarea>
        </v-card-text>
        <v-divider></v-divider>

        <!-- 해쉬태그 -->
        <v-card-text>
          <v-combobox
            class="pt-6"
            v-model="hashtags"
            :items="items"
            label="태그 입력하세요"
            :maxlength="max"
            @keypress="isNotSpecail"
            multiple
            chips
            dense
          ></v-combobox>
        </v-card-text>
        <v-divider></v-divider>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="modeUpdate = !modeUpdate; content = item.content"
        >
          <v-icon left dark>mdi-arrow-left</v-icon>back
        </v-btn>
        <v-btn color="blue-grey" style="float:right" class="ma-2 white--text" @click="actUpdate()">
          upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </div>
      <!-- 이미지 아래 부분 : 글 수정 모드 -->
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
      comm: {
        id: "",
        username: ""
      },
      modeComment: true,
      modeUpdate: false,
      content: "",
      items: [],
      max: 20,
      comments: []
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
    // article id로 게시물정보 가져오기.
    this.loading = true;

    this.$store
      .dispatch("getArticle", `/articles/${this.$route.query.id}`)
      .finally(() => {
        setTimeout(() => {
          let array = this.item.commentSet;
          if (array !== undefined) {
            for (let index = 0; index < array.length; index++) {
              if (array[index].user.id === this.userId) {
                this.repComment.id = array[index].id;
                this.repComment.userName = array[index].user.username;
                this.repComment.content = array[index].content;
                this.repComment.userImage = array[index].user.image;
                break;
              } else if (index == array.length - 1) {
                this.repComment.id = array[index].id;
                this.repComment.userName = array[index].user.username;
                this.repComment.content = array[index].content;
                this.repComment.userImage = array[index].user.image;
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
    // console.log(this.hashtags);
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
          // console.log(response);

          this.$store.dispatch(
            "getArticle",
            `/articles/${this.$route.query.id}`
          );

          // this.comments.splice(index, 1);
          if (this.repComment.id == commId) {
            this.repComment = null;
          }
          // if(commId)
        })
        .catch(err => {
          console.log(err.response);
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
          .then(response => {
            alert(response.data.message);
            this.$router.push("mypage");
          })
          .catch(response => {
            alert(response.data.message);
          });
      } else {
        // 수정 : content, hashtag만 가능.
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
    // 피드 업데이트
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
      // fd.append("image", this.item.image);
      fd.append("content", this.content);
      fd.append("hashtag", tags);

      console.log(fd);
      console.log(config);

      http
        .put(`/articles/${this.item.id}/`, fd, config)
        .then(res => {
          console.log(res);
          this.$router.push(`article?id=${this.item.id}`);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    isNotSpecail($event) {
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
      console.log(this.comm.id + " " + this.comm.username);
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
  color: #ffffff;
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