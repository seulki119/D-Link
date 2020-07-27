<template>
  <div class="container">
    <StackGrid :columnWidth="200" :gutterX="20" :gutterY="20">
      <!-- you component like this -->
      <div class="stack-item" v-for="(item, index) in items" :key="index">
        <!-- some thing have fixed height-->
        <img
          :src="item.image"
          alt=""
          @click="showDetail(item.id)"
          style="cursor: pointer;"
        />
        <img
          @click="scrapAction(item.id)"
          style="right:100%"
          src="@/assets/turned_in_not-24px.svg"
          alt=""
        />
        {{ item.scrap[0] }}
      </div>
    </StackGrid>
  </div>
</template>
<script>
import StackGrid from "vue-stack-grid-component";
import http from "@/util/http-common";

export default {
  components: {
    StackGrid,
  },
  data() {
    return {
      items: [
        {
          id: "",
          user: {
            id: "",
            username: "",
            image: "",
          },
          image: "",
          hashTag: "",
          content: "",
          scrap: [],
        },
      ],
    }; //article에는 고유번호(article.id)/이미지src/스크랩횟수
  },
  created() {
    http
      .get("/articles")
      .then((response) => {
        console.log(response);
        this.items = response.data;
      })
      .catch((error) => {
        console.dir(error.data);
      });
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    // scrapAction(id) {
    //   // 스크랩 처리
    // },
  },
};
</script>
