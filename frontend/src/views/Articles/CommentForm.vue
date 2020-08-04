<template>
  <div>
    <!-- 댓글 모두보기 -->
    <v-slide-y-transition v-if="comments !== undefined && comments.length > 0">
      <v-card-text>
        <!--  -->
        <v-list-item v-for="(comment, index) in comments" :key="index">
          <v-list-item-avatar color="grey" v-if="comment.content != null && comment.content != ' '">
            <!-- <v-img :src="comment.user.image"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content v-if="comment.content != null && comment.content != ' '">
            <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
          </v-list-item-content>
          <!-- 댓글 삭제 - 권한 : 1)댓글 작성자 2)글 작성자  -->
          <v-btn
            v-show="itemUserId == userId || comment.user.id == userId"
            text
            icon
            color="deep-purple accent-2"
            @click="snackbar = true; comm = {id:comment.id, username:comment.user.username, index:index}"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                text
                color="deep-purple accent-1"
                v-bind="attrs"
                @click="deleteComment(comm.id, comm.index)"
              >삭제</v-btn>

              <v-btn text color="deep-purple accent-2" v-bind="attrs" @click="snackbar = false">X</v-btn>
            </template>
          </v-snackbar>
        </v-list-item>
      </v-card-text>
    </v-slide-y-transition>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  props: {
    comments: {
      type: Array,
      default: () => ({})
    },
    itemUserId: Number,
    userId: Number,
    commentId: Number
  },
  data: function() {
    return {
      show: false,
      comm: {
        id: "",
        username: "",
        index: ""
      },
      timeout: 2000,
      text: "댓글 기능 텍스트",
      snackbar: false
    };
  },
  created() {
    console.log(this.comments);
  },
  beforeUpdate() {
    console.log("up");
  },
  methods: {
    //댓글삭제
    deleteComment(commId, index) {
      console.log(commId);

      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      http
        .delete(
          `/articles/comment/${this.commentId}/recomment/${commId}/`,
          config
        )
        .then(response => {
          console.log(response);
          this.snackbar = false;
          this.comments.splice(index, 1);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
</style>