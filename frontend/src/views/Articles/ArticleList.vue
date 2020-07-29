<template>
  <div class="container">
    <StackGrid :columnWidth="200" :gutterX="20" :gutterY="20">
      <!-- you component like this -->
      <div class="stack-item" v-for="(item, index) in items" :key="index">
        <!-- some thing have fixed height-->
        <div class="stack-item stack-item-6">
          <img
            :src="`//127.0.0.1:8000/${item.image}`"
            alt
            @click="showDetail(item.id)"
            style="cursor: pointer;width:200px;"
          />
          <img
            @click="scrapAct(item.id)"
            style="right:100%;float:right;cursor: pointer;"
            :src="scrapSrc"
            alt
          />
          <!-- {{ item.scrap.length }} -->
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
    StackGrid
  },
  data() {
    return {
      scrapSrc: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png"
    };
  },
  computed: {
    ...mapGetters(["items"])
  },
  created() {
    this.$store.dispatch("getArticles", "/articles");
    // console.log("로그인된 user pk는 " + this.$store.getters.userId);

    // 각 item의 scrap 배열에 로그인된 id가 있다면 색깔있는 아이콘,
    // 없다면 컬러가 없는 아이콘.

    // if(this.items.scrap.includes())
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    scrapAct(id) {
      this.$store.dispatch("createComment", `/articles/${id}/scrap`);
      // scrap 동작시 아이콘src 토글
      this.scrapSrc =
        "https://img.icons8.com/plasticine/24/000000/wine-glass.png";
    }
  }
};
</script>
