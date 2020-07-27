<template>
  <div class="container">
    <StackGrid :columnWidth="200" :gutterX="20" :gutterY="20">
      <!-- you component like this -->
      <div class="stack-item" v-for="(item, index) in 9" :key="index">
        <!-- some thing have fixed height-->
        <img
          :src="`https://picsum.photos/500/300?image=${index * 5 + 10}`"
          alt=""
          @click="showDetail(item.no)"
          style="cursor: pointer;"
        />
        <img style="right:100%" src="@/assets/turned_in_not-24px.svg" alt="" />
        {{ item.scrap }}
      </div>
    </StackGrid>
  </div>
</template>
<script>
import StackGrid from "vue-stack-grid-component";
// import http from "@/util/http-common";

export default {
  components: {
    StackGrid,
  },
  // data: {
  //   items: [], //article에는 고유번호(article.id)/이미지src/스크랩횟수
  // },
  // created() {
  //   http
  //     .get("/articles")
  //     .then((response) => {
  //       this.items = response.items;
  //     })
  //     .catch((error) => {
  //       console.dir(error.data);
  //     });
  // },
  methods: {
    showDetail(no) {
      this.$router.push(`article/${no}`);
    },
  },
};
</script>
