<template>
  <div>
    <v-app-bar app max-width="600" min-width="300" elevate-on-scroll class="mx-auto">
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
          <div class="stack-item" v-for="(item, index) in searchList" :key="index">
            <div v-if="item.user.id != userId" class="stack-item stack-item-6">
              <img
                :src="`//i3b307.p.ssafy.io/${item.image}`"
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
      searchList: [],
      counter: 0,
      bottom: false
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
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
      http
        .post(
          "/articles/search/",
          { hashtags: searchWord, counter: this.counter },
          config
        )
        .then(response => {
          console.log(response);
          this.counter += 10;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            this.searchList.push(data[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  watch: {
    tag(val) {
      if (val.length > 3) {
        this.$nextTick(() => this.tag.pop());
      }
    },
    bottom(bottom) {
      if (bottom) {
        this.search();
      }
    }
  }
};
</script>