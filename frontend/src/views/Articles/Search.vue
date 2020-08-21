<template>
  <v-container max-width="600" min-width="300">
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
        clearable
        no-data-text
        open-on-clear
        :search-input.sync="searched"
        @keypress.enter="search()"
        hint="Maximum of 3 tags"
      >
        <template #selection="{index, item}">
          <v-chip close @click:close="remove(item)" :color="colors[index]">{{item}}</v-chip>
        </template>
      </v-autocomplete>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-auto" v-show="tag.length !==0" @click="search()">검색</v-btn>
    </v-app-bar>
    <v-snackbar v-model="snackbar" :color="color" :top="y === 'top'" :timeout="timeout">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="this.$store.state.snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto" max-width="600">
      <v-container fluid v-images-loaded:on.progress="imageProgress">
        <v-layout class="justify-space-between" row>
          <v-flex class="mx-5 px-1" v-for="(item, index) in searchList" :key="index" xs12 sm5>
            <div v-if="item.user.id != userId">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card :elevation="hover ? 24 : 0">
                    <v-img
                      class="ma-5 align-center"
                      :src="`//i3b307.p.ssafy.io/${item.image}`"
                      @click="showDetail(item.id)"
                      style="cursor: pointer;"
                      aspect-ratio="1"
                      min-height="265"
                    />
                  </v-card>
                </template>
              </v-hover>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import imagesLoaded from "vue-images-loaded";
import http from "@/util/http-common";
import { mapGetters } from "vuex";
export default {
  directives: {
    imagesLoaded
  },
  data() {
    return {
      tag: [],
      tags: [],
      searchList: [],
      counter: 0,
      bottom: false,
      timeout: 2000,
      y: "top",
      hover: false,
      searchWord: "",
      test: "",
      searched: null,
      colors: ["red", "blue", "green"]
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapGetters(["userId"]),
    ...mapGetters(["color"]),
    ...mapGetters(["snackbar"]),
    ...mapGetters(["snackbarMessage"])
  },
  beforeCreate() {
    if (this.$store.state.snackbar) {
      setTimeout(() => {
        this.$store.state.snackbar = false;
      }, 2000);
    }
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
      let tmp2 = [];
      let taste1 = this.$store.state.userInfo.taste1;
      let taste2 = this.$store.state.userInfo.taste2;
      for (let t in res.data) {
        tmp.push(res.data[t].tag);
      }
      this.tags = tmp;
      if (this.tags.includes(taste1)) {
        tmp2.push(taste1);
      }
      if (this.tags.includes(taste2)) {
        tmp2.push(taste2);
      }
      this.tag = tmp2;
      this.search();
    });
  },

  methods: {
    imageProgress(instance, image) {
      const result = image.isLoaded ? "loaded" : "broken";
      console.log("image is " + result + " for " + image.img.src);
    },
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },

    search() {
      this.searchList = [];
      this.counter = 0;
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      this.searchWord = "";
      for (let i = 0; i < this.tag.length; i++) {
        this.searchWord += "#" + this.tag[i];
      }
      http
        .post(
          "/articles/search/",
          { hashtags: this.searchWord, counter: this.counter },
          config
        )
        .then(response => {
          this.counter += 10;
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            this.searchList.push(data[i]);
          }
          if (this.bottomVisible()) {
            this.addList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addList() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      http
        .post(
          "/articles/search/",
          { hashtags: this.searchWord, counter: this.counter },
          config
        )
        .then(response => {
          this.counter += 10;
          let data = response.data;
          if (data.length === 0 && this.counter > 10) {
            this.counter -= 10;
          }
          for (let i = 0; i < data.length; i++) {
            this.searchList.push(data[i]);
          }
          if (this.bottomVisible()) {
            this.addList();
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
    },
    // remove(val) {

    // },
    remove(item) {
      const index = this.tag.indexOf(item);
      if (index >= 0) this.tag.splice(index, 1);
    }
  },
  watch: {
    tag(val) {
      console.log(this.tag);

      if (val.length > 3) {
        this.$nextTick(() => this.tag.pop());
      }
      if (val.length === 0) {
        this.searchList = [];
      }
      this.searched = null;
    },
    bottom(bottom) {
      if (bottom) {
        this.addList();
      }
    }
  }
};
</script>
