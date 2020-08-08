<template>
  <div>
    <!-- 댓글 모두보기 -->
    <v-slide-y-transition v-if="comments !== undefined && comments.length > 0">
      <v-card-text>
        <!--  -->
        <v-list-item v-for="(comment, index) in comments" :key="index">
          <v-list-item-avatar color="grey" v-if="comment.content != null && comment.content != ' '">
            <v-img
              v-if="comment.user.image != null"
              :src="`//127.0.0.1:8000/${comment.user.image}`"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content v-if="comment.content != null && comment.content != ' '">
            <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
            {{ comment.content }}
          </v-list-item-content>
          <!-- 댓글 삭제 - 권한 : 1)댓글 작성자 2)글 작성자  -->
          <span
            v-show="itemUserId == userId || comment.user.id == userId"
            @click="deleteComment(comment.id);"
            class="grey--text text--lighten-1 commentMenu"
          >삭제</span>
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
      }
    };
  },
  created() {
    // console.log(this.comments);
  },
  beforeUpdate() {
    // console.log("up");
  },
  methods: {
    //댓글삭제
    deleteComment(commId, index) {
      // console.log(commId);

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
.commentMenu {
  float: right;
  font-size: small;
  cursor: pointer;
}
</style>