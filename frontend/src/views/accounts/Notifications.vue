<template>
  <v-card class="mx-auto pa-5" max-width="600">
    <span class="grey--text headline">알림 센터</span>
    <v-btn style="float:right;" icon @click="remove">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-list :elevation="2">
      <template v-if="logs">
        <template v-for="(alarm,index) in logs.slice().reverse()">
          <v-list-item :key="index" router :to="(`article?id=${alarm.articleId}`)">
            <v-list-item-avatar>
              <v-img :src="`//i3b307.p.ssafy.io/${alarm.thumbnailPath}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="messageType[alarm.alarmType]"></v-list-item-title>
              <v-list-item-subtitle
                v-html="'<span class=font-weight-bold>By '+alarm.username+'</span> &mdash;'+alarm.message"
              ></v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
      <template v-else>
        <v-card-title>
          <span class="grey--text headline mx-auto">알림이 없습니다.</span>
        </v-card-title>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      messageType: [
        "게시물이 스크랩되었습니다.",
        "댓글이 달렸습니다.",
        "대댓글이 달렸습니다."
      ],
      logs: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("alarmReset");
    let token = localStorage.getItem("token");

    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http
      .post(`/alarms/` + this.$store.getters.userId + "/", "", config)
      .then(res => {
        this.logs = res.data;
        console.log(this.logs);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    remove() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .delete(`/alarms/${this.$store.getters.userId}`, config)
        .then(res => {
          console.log(res);
          this.logs = null;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>