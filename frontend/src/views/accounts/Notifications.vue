<template>
  <v-card class="mx-auto pa-5" max-width="600">
    <v-list three-line>
      <template v-for="(item, index) in items">
        <!-- header : 오늘, 이번 주, 이번 달 -->
        <v-subheader v-if="item.header" :key="index" v-text="item.header"></v-subheader>

        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-else :key="index">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <p v-for="(alarm, index) in this.alarms" :key="index"> {{ alarm }} </p>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      { header: "오늘" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "댓글이 달렸습니다.",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title:
          '게시물이 스크랩되었습니다. <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      { header: "이번 주" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "댓글이 달렸습니다.",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title:
          '게시물이 스크랩되었습니다. <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos. We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  }),
  computed: {
    ...mapGetters(["alarms"])
  },
};
</script>