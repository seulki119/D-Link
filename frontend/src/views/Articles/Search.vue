<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600" max-height="300">
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
      <!-- <StackGrid :columnWidth="210" :gutterX="20" :gutterY="20">
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
      </StackGrid>-->
      <stack :gutter-width="20" :gutter-height="20" :column-min-width="210" monitor-images-loaded>
        <stack-item
          v-for="(item, index) in searchList"
          :key="index"
          style="transition: transform 500ms"
        >
          <div v-if="item.user.id != userId">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card :elevation="hover ? 24 : 0" class="mx-auto" outlined>
                  <v-img
                    :src="`//i3b307.p.ssafy.io/${item.image}`"
                    @click="showDetail(item.id)"
                    style="cursor: pointer;"
                  />
                </v-card>
              </template>
            </v-hover>
          </div>
        </stack-item>
      </stack>
    </v-card>
  </v-container>
</template>

<script>
import { Stack, StackItem } from "vue-stack-grid";
// import StackGrid from "vue-stack-grid-component";
import http from "@/util/http-common";
import { mapGetters } from "vuex";
export default {
  components: {
    // StackGrid
    Stack,
    StackItem
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
    ...mapGetters(["userInfo", "userId"])
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
      let taste1 = this.$store.state.userInfo.taste1;
      let taste2 = this.$store.state.userInfo.taste2;
      for (let t in res.data) {
        tmp.push(res.data[t].tag);
      }
      this.tags = tmp;
      if (this.tags.includes(taste1)) {
        this.tag.push(taste1);
      }
      if (this.tags.includes(taste2)) {
        this.tag.push(taste2);
      }
      this.search();
    });
  },
  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },

    search() {
      this.searchList.length = 0;
      this.counter = 0;
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
    //asdfadsfasdfasdkfjadsklfjdklasfjklasdfjklasdfjasdfjl
    addList() {
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
          console.log(this.searchList);
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
        this.addList();
      }
    }
  }
};
</script>
