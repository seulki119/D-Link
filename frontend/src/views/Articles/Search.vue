<template>
  <div>
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
    <v-container max-width="600" min-width="300">
      <v-card class="mx-auto pa-5" max-width="600">
        <StackGrid :columnWidth="210" :gutterX="20" :gutterY="20">
          <!-- you component like this -->
          <div
            class="stack-item"
            v-for="(item, index) in searchList.slice().reverse()"
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
            </div>
          </div>
        </StackGrid>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import StackGrid from "vue-stack-grid-component";
import http from "@/util/http-common";
import { mapGetters } from "vuex";
export default {
  components: {
    StackGrid
  },
  data() {
    return {
      tag: [],
      tags: [],
      searchList: []
    };
  },
  computed: {
    ...mapGetters(["userId"])
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
          this.searchList = res.data;
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
</style>
