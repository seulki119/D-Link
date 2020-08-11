<template>
  <v-card class="mx-auto pa-5" max-width="600">
    <v-list>
      <template v-for="(alarm,index) in this.alarms">
        <!-- <v-subheader :key="index" v-text="messageType[alarm.alarmType]"></v-subheader> -->
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
    </v-list>
    <!-- <p v-for="(alarm, index) in this.alarms" :key="index">{{ alarm }}</p> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      messageType: [
        "게시물이 스크랩되었습니다.",
        "댓글이 달렸습니다.",
        "대댓글이 달렸습니다."
      ]
    };
  },
  computed: {
    ...mapGetters(["alarms"])
  }
};
</script>