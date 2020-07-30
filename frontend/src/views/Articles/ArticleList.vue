<template>
  <div class="container">
    <StackGrid :columnWidth="200" :gutterX="20" :gutterY="20">
      <!-- you component like this -->
      <div
        class="stack-item"
        v-for="(item, index) in items.slice().reverse()"
        :key="index"
      >
        <!-- some thing have fixed height-->
        <div v-if="item.user.id != userId" class="stack-item stack-item-6">
          <img
            :src="`//127.0.0.1:8000/${item.image}`"
            alt
            @click="showDetail(item.id)"
            style="cursor: pointer;width:200px;"
          />
          <div class="scrapInfo">
            {{ item.scrap.length }}
            <!-- scrap icon : scrap[]에 로그인된 id가 존재하는지 확인 -->
            <img
              v-if="!item.scrap.includes(userId)"
              class="scrapInfo"
              @click="scrapAct(item.id)"
              :src="(scrapSrc = scrapNo)"
            />
            <img
              v-else
              class="scrapInfo"
              @click="scrapAct(item.id)"
              :src="(scrapSrc = scrapYes)"
            />
          </div>
        </div>
      </div>
    </StackGrid>
  </div>
</template>
<script>
import StackGrid from "vue-stack-grid-component";
import { mapGetters } from "vuex";

export default {
  components: {
    StackGrid,
  },
  data() {
    return {
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png",
    };
  },
  computed: {
    ...mapGetters(["items"]),
    ...mapGetters(["userId"]),
  },
  created() {
    this.$store.dispatch("getArticles", "/articles");
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    scrapAct(id) {
      this.$store.dispatch("doScrap", {
        url: `/articles/${id}/scrap`,
        page: "articlelist",
      });
      // scrap 동작시 아이콘src 토글

      // if (this.scrapSrc == this.scrapYes) {
      //   this.scrapSrc = this.scrapNo;
      // } else {
      //   this.scrapSrc = this.scrapYes;
      // }
    },
  },
};
</script>
<style>
.scrapInfo {
  right: 100%;
  float: right;
}
.scrapInfo img {
  cursor: pointer;
}
</style>
