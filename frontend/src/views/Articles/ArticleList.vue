<template>
  <v-container max-width="600" min-width="300">
    <v-snackbar v-model="snackbar" :color="color" :top="y === 'top'" :timeout="timeout">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="this.$store.state.snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto pa-5" max-width="600">
      <stack :gutter-width="20" :gutter-height="20" :column-min-width="210" monitor-images-loaded>
        <stack-item v-for="(item, index) in items" :key="index" style="transition: transform 500ms">
          <div v-if="item.user.id != userId">
            <!-- <v-hover>
              <template v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 0" class="mx-auto" outlined min-height="320">-->
            <v-img
              class="mx-auto align-center"
              :src="`//i3b307.p.ssafy.io/${item.image}`"
              @click="showDetail(item.id)"
              style="cursor: pointer;"
              min-height="265"
            />
            <div class="ml-5">
              <img
                style="cursor: pointer;float:right"
                @click="scrapAct(index, item.id, item.user.id, item.image)"
                :src="scrap[index] ? scrapYes : scrapNo"
              />
              <span style="float:right">{{ item.scrap.length }}</span>
            </div>
            <!-- </v-card>
              </template>
            </v-hover>-->
          </div>
        </stack-item>
      </stack>
    </v-card>
  </v-container>
</template>
<script>
import { Stack, StackItem } from "vue-stack-grid";
import { mapGetters } from "vuex";
import http from "@/util/http-common";
export default {
  components: {
    Stack,
    StackItem
  },
  data() {
    return {
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png",
      bottom: false,
      counter: 0,
      items: [],
      scrap: [],
      timeout: 2000,
      y: "top",
      hover: false
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    ...mapGetters(["color"]),
    ...mapGetters(["snackbar"]),
    ...mapGetters(["snackbarMessage"])
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.addList();
  },

  methods: {
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },

    scrapAct(index, id, articleUserId, thumbnailPath) {
      this.clicked = true;
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .get(`/articles/${id}/scrap`, config)
        .then(() => {
          let list = [...this.scrap];
          list.splice(index, 1, !this.scrap[index]);
          if (!this.scrap[index]) {
            this.items[index].scrap.length++;
          } else {
            this.items[index].scrap.length--;
          }
          this.scrap = list;
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
      if (articleUserId) {
        this.$store.dispatch("sendAlarm", {
          url: "/alarms/Share/",
          articleUserId: `${articleUserId}`,
          articleId: `${id}`,
          thumbnailPath: `${thumbnailPath}`,
          message: "",
          alarmType: 0 // 스크랩
        });
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addList() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .patch("/articles/", { counter: this.counter }, config)
        .then(response => {
          this.counter += 10;
          let data = response.data;
          if (data.length === 0) {
            this.counter -= 10;
          }
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i]);
            this.scrap.push(data[i].scrap.includes(this.userId));
          }
          if (this.bottomVisible()) {
            this.addList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addList();
      }
    }
  },
  beforeCreate() {
    if (this.$store.state.snackbar) {
      setTimeout(() => {
        this.$store.state.snackbar = false;
      }, 2000);
    }
  }
};
</script>
