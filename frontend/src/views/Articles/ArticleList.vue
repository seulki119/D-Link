<template>
  <div class="container">
    <StackGrid :columnWidth="200" :gutterX="20" :gutterY="20">
      <!-- you component like this -->
      <div class="stack-item" v-for="(item, index) in items" :key="index">
        <!-- some thing have fixed height-->
        <img
          :src="`https://picsum.photos/500/300?image=${index * 5 + 10}`"
          alt=""
          @click="showDetail(item.id)"
          style="cursor: pointer;"
        />
        <img
          @click="scrapAction(item.id)"
          style="right:100%;cursor: pointer;"
          src="@/assets/turned_in_not-24px.svg"
          alt=""
        />
        <!-- {{ item.scrap.length }} -->
      </div>
    </StackGrid>
  </div>
</template>
<script>
import StackGrid from "vue-stack-grid-component";
import http from "@/util/http-common";
import { mapGetters } from "vuex";

export default {
  components: {
    StackGrid,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["items"]),
  },
  created() {
    this.$store.dispatch("getArticles", "/articles");
    console.log("로그인된 user pk는 " + this.$store.getters.userId);
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    scrapAction(id) {
      // 스크랩 처리 - 본인 게시물이 아닐 경우에만 가능.
      if (id != this.$store.getters.userId) {
        http
          .get(`articles/${id}/scrap`, [this.$store.getters.userId])
          .then((response) => {
            //스크랩처리가 정상적으로 되었을 경우, img src 변경
            this.scrap = response.data.scrap;
          });
      }
    },
  },
};
</script>
