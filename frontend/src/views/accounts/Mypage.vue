<!-- eslint-disable -->
<template>
  <v-container max-width="600" min-width="300">
    <v-snackbar v-model="snackbar" :color="color" :top="y === 'top'" :timeout="timeout">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="this.$store.state.snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-layout row wrap class="pa-5">
        <v-flex xs12 sm6 md4 lg3 x12>
          <image-input v-model="avatar">
            <div slot="activator">
              <v-avatar size="136px" v-ripple v-if="!previous && !avatar">
                <span>Click to add avatar</span>
              </v-avatar>
              <v-avatar size="136px" v-ripple v-else-if="!avatar">
                <img :src="`//i3b307.p.ssafy.io/${previous}`" alt />
              </v-avatar>
              <v-avatar size="136px" v-ripple v-else>
                <img :src="avatar.imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </image-input>
          <v-slide-x-transition>
            <clipper-fixed
              class="my-clipper"
              ref="clipper"
              v-if="avatar && !saved"
              :src="avatar.imageURL"
              round
            ></clipper-fixed>
          </v-slide-x-transition>
          <v-slide-x-transition>
            <div v-if="avatar && saved == false">
              <v-btn @click="uploadImage" :loading="saving">Save Avatar</v-btn>
            </div>
          </v-slide-x-transition>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 x12>
          <v-container>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{username}}</v-list-item-title>
                <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <span>{{intro}}</span>
              </v-list-item-content>
            </v-list-item>
          </v-container>
        </v-flex>
      </v-layout>
      <v-btn block dark class="ma-2 mx-auto" @click="update()">
        <v-icon left>mdi-account</v-icon>프로필 수정
      </v-btn>
      <v-btn block class="ma-2 mx-auto" @click="logout()">
        <v-icon left dark>mdi-logout</v-icon>로그아웃
      </v-btn>
    </v-card>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-tabs centered icons-and-text>
        <v-tab>업로드한 게시물</v-tab>
        <v-tab>스크랩한 게시물</v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="n in articleSet.slice().reverse()" :key="n.image" cols="4">
                <v-img
                  :src="`//i3b307.p.ssafy.io/${n.image}`"
                  class="grey lighten-2 pa-1"
                  aspect-ratio="1"
                  @click="showDetail(n.id)"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <!-- <v-data-table
              :items="scrapSet.slice().reverse()"
              :items-per-page="9"
              class="elevation-1"
            >-->
            <v-row>
              <v-col v-for="n in scrapSet.slice().reverse()" :key="n.image" cols="4">
                <v-img
                  :src="`//i3b307.p.ssafy.io/${n.image}`"
                  class="grey lighten-2 pa-1"
                  aspect-ratio="1"
                  @click="showDetail(n.id)"
                ></v-img>
              </v-col>
            </v-row>
            <!-- </v-data-table> -->
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ImageInput from "./ImageInput.vue";
import http from "@/util/http-common";
export default {
  data() {
    return {
      email: "",
      articleSet: [],
      id: "",
      intro: "",
      scrapSet: [],
      username: "",
      avatar: null,
      previous: null,
      image: null,
      saving: false,
      saved: false,
      timeout: 2000,
      y: "top"
    };
  },
  components: {
    ImageInput: ImageInput
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/accounts/{temp}/", "", config).then(res => {
      this.articleSet = res.data.articleSet;
      this.scrapSet = res.data.scrapSet;
      this.id = res.data.id;
      this.previous = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = this.userInfo.email;
      console.log(res);
    });
    if (this.$store.state.snackbar) {
      setTimeout(() => {
        this.$store.state.snackbar = false;
      }, 2000);
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["color"]),
    ...mapGetters(["snackbar"]),
    ...mapGetters(["snackbarMessage"])
  },
  methods: {
    ...mapActions(["logout"]),
    showDetail(id) {
      this.$router.push(`article?id=${id}`);
    },
    update() {
      this.$router.push("updateuser");
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const fd = new FormData();
      let file = this.avatar.formData.get("file");
      const canvas = this.$refs.clipper.clip();
      let resultURL = canvas.toDataURL("image/jpeg", 0.5);
      let blob = this.dataURItoBlob(resultURL);
      this.image = new File([blob], file.name);
      fd.append("image", this.image);
      http.put("/accounts/min/image/", fd, config).then(res => {
        this.previous = res.data.image;
        this.avatar = null;
        this.$store.dispatch("getUserInfo");
      });
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var bb = new Blob([ab], { type: mimeString });
      return bb;
    }
  },
  avatar: {
    handler: function() {
      this.saved = false;
    },
    deep: true
  }
};
</script>
