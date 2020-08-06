<template>
  <v-app-bar
    app
    color="indigo"
    dark
    max-width="600"
    min-width="300"
    elevate-on-scroll
    class="mx-auto"
  >
    <v-icon class="mx-auto">mdi-magnify</v-icon>
    <v-spacer></v-spacer>
    <v-autocomplete
      class="pt-2"
      v-model="tag"
      :items="tags"
      :counter="3"
      dense
      chips
      small-chips
      multiple
      hide-no-data
      hide-selected
      deletable-chips
      no-data-text
      hint="Maximum of 3 tags"
    ></v-autocomplete>
    <v-spacer></v-spacer>
    <v-btn icon class="mx-auto" v-show="tag.length !==0 " @click="search()">검색</v-btn>
  </v-app-bar>
</template>
<script>
// import StackGrid from "vue-stack-grid-component";
import http from "@/util/http-common";
export default {
  // components: {
  //   StackGrid
  // },
  data() {
    return {
      tag: [],
      tags: [],
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png"
    };
  },
  created() {
    let token = localStorage.getItem("token");

    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/articles/hashtag/", "", config).then(res => {
      let tmp = [];
      for (let t in res.data) {
        tmp.push(res.data[t].tag);
      }
      this.tags = tmp;
    });
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    scrapAct(id) {
      this.$store.dispatch("doScrap", {
        url: `/articles/${id}/scrap`,
        page: "articlelist"
      });
      // scrap 동작시 아이콘src 토글

      // if (this.scrapSrc == this.scrapYes) {
      //   this.scrapSrc = this.scrapNo;
      // } else {
      //   this.scrapSrc = this.scrapYes;
      // }
    },
    search() {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      let searchWord = "";

      for (let t in this.tag) {
        searchWord += "#" + this.tag[t];
      }
      const fd = new FormData();
      console.log(searchWord);
      fd.append("hashtags", searchWord);
      http
        .post("/articles/search/", fd, config)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  watch: {
    tag(val) {
      if (val.length > 3) {
        this.$nextTick(() => this.tag.pop());
      }
    }
  }
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
