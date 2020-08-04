<template>
  <div>
    <!-- 대댓글 접기/펼치기 버튼 -->
    <!-- <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click.native="show = !show"
        v-if="comments.length > 0"
      >
        {{
        `대댓글 ${comments.length}개`
        }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>-->

    <!-- 댓글 모두보기 -->
    <v-slide-y-transition v-if="comments !== undefined && comments.length > 0">
      <v-card-text>
        <!--  -->
        <v-list-item v-for="(comment, index) in comments" :key="index">
          <v-list-item-avatar color="grey">
            <!-- <v-img :src="comment.user.image"></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ comment.user.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- 댓글 삭제 - 권한 : 1)댓글 작성자 2)글 작성자  -->
          <v-btn
            v-show="itemUserId == userId || comment.user.id == userId"
            text
            icon
            color="deep-purple accent-2"
            @click="snackbar = true; comm = {id:comment.id, username:comment.user.username}"
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
                @click="deleteComment(comm.id)"
              >삭제</v-btn>
              <v-btn
                text
                color="deep-purple accent-1"
                v-bind="attrs"
                @click="createRecomment(comm.id, comm.username)"
              >댓글달기</v-btn>

              <v-btn text color="deep-purple accent-2" v-bind="attrs" @click="snackbar = false">X</v-btn>
            </template>
          </v-snackbar>
          <!-- 나머지 유저 : 대댓글 달기 -->
          <v-btn
            v-show="itemUserId != userId && comment.user.id != userId"
            text
            icon
            color="deep-purple accent-2"
            @click="snackbar2 = true; comm = {id:comment.id, username:comment.user.username}"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

          <v-snackbar v-model="snackbar2" :timeout="timeout">
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                text
                color="deep-purple accent-1"
                v-bind="attrs"
                @click="createRecomment(comm.id, comm.username)"
              >댓글달기</v-btn>

              <v-btn text color="deep-purple accent-2" v-bind="attrs" @click="snackbar2 = false">X</v-btn>
            </template>
          </v-snackbar>
        </v-list-item>
      </v-card-text>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => ({})
    },
    itemUserId: Number,
    userId: Number
  },
  data: function() {
    return {
      show: false,
      comm: {
        id: "",
        username: ""
      },
      timeout: 1500,
      text: "댓글 기능 텍스트",
      snackbar: false,
      snackbar2: false
    };
  },
  created() {
    console.log(this.comments);
  }
};
</script>

<style>
</style>