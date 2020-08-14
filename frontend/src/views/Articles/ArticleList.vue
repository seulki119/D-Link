<template>
  <!-- <div class="container"> -->
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <StackGrid :columnWidth="210" :gutterX="20" :gutterY="20">
        <!-- you component like this -->
        <div class="stack-item" v-for="(item, index) in items" :key="index">
          <!-- some thing have fixed height-->
          <div v-if="item.user.id != userId" class="stack-item stack-item-6">
            <img
              :src="`//i3b307.p.ssafy.io/${item.image}`"
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
                @click="scrapAct(item.id, item.user.id, item.image)"
                :src="(scrapSrc = scrapNo)"
              />
              <img v-else class="scrapInfo" @click="scrapAct(item.id)" :src="(scrapSrc = scrapYes)" />
            </div>
          </div>
        </div>
      </StackGrid>
    </v-card>
  </v-container>
  <!-- </div> -->
</template>
<script>
import StackGrid from "vue-stack-grid-component";
import { mapGetters } from "vuex";
import http from "@/util/http-common";
export default {
  components: {
    StackGrid
  },
  data() {
    return {
      scrapSrc: "",
      scrapNo: "https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",
      scrapYes: "https://img.icons8.com/plasticine/24/000000/wine-glass.png",
      bottom: false,
      counter: 0,
      items: []
    };
  },
  computed: {
    ...mapGetters(["userId"])
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
    scrapAct(id, articleUserId, thumbnailPath) {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .get(`/articles/${id}/scrap`, config)
        .then(response => {
          console.log(response);
        })
        .catch(response => {
          console.log(response);
          alert("에러가 발생했습니다.");
        });
      // this.$store.dispatch("doScrap", {
      //   url: `/articles/${id}/scrap`,
      //   page: "articlelist"
      // });
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
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i]);
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
      console.log(bottom);
      if (bottom) {
        this.addList();
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
