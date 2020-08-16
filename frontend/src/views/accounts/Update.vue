<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <!-- <v-row class="pa-5" no-gutters> -->
      <v-layout row wrap class="pa-5">
        <v-flex xs12 sm6 md4 lg3 x12>
          <image-input v-model="avatar">
            <div slot="activator">
              <v-avatar size="136px" v-ripple v-if="!previous && !avatar" class="grey lighten-3">
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
              rotate
              round
            ></clipper-fixed>
          </v-slide-x-transition>
          <v-slide-x-transition>
            <div v-if="avatar && saved == false">
              <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
            </div>
          </v-slide-x-transition>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 x12>
          <v-container v-model="info">
            <v-text-field v-model="username" label="Username" :error-messages="errors"></v-text-field>
            <v-text-field v-model="email" label="Email" disabled></v-text-field>
            <v-textarea v-model="intro" label="Intro"></v-textarea>
          </v-container>
          <v-slide-x-transition>
            <v-btn
              block
              color="blue-grey"
              class="ma-2 white--text"
              v-if="!updated&&valid"
              @click="updateInfo"
              :loading="saving"
            >
              회원정보수정
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-slide-x-transition>
          <v-btn block color="black" class="ma-2 white--text" @click="ChangePassword()">
            <v-icon left dark>mdi-key-variant</v-icon>패스워드 변경
          </v-btn>
          <v-btn block color="black" class="ma-2 white--text" @click="logout()">
            <v-icon left dark>mdi-logout</v-icon>로그아웃
          </v-btn>
        </v-flex>
      </v-layout>
      <!-- </v-row> -->
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ImageInput from "./ImageInput.vue";
import http from "@/util/http-common";
export default {
  name: "app",
  data() {
    return {
      info: null,
      avatar: null,
      previous: null,
      image: null,
      saving: false,
      saved: false,
      updated: true,
      valid: true,
      intro: "",
      email: "",
      username: "",
      previousUsername: "",
      errors: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
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
      this.previous = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.previousUsername = res.data.username;
      this.email = this.userInfo.email;
    });
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true
    },
    info: {
      handler: function() {
        this.updated = false;
      }
    },
    username() {
      if (this.username.length === 0) {
        this.valid = false;
        this.errors = this.previousUsernamevalid ? [] : ["필수 입력칸입니다."];
      } else if (this.username.length > 10) {
        this.valid = false;
        this.errors = this.valid ? [] : ["Max 10 characters"];
      } else {
        var re = /^([\wㄱ-ㅎ가-힣/./+/-]*)$/;
        if (!re.test(this.username)) {
          this.valid - false;
          this.errorsName = this.valid
            ? []
            : ["닉네임은 문자, 숫자, +, -, _ 만 가능합니다."];
        } else {
          this.valid = true;
          const fd = new FormData();
          fd.append("username", this.username);
          http.post("/accounts/duplicated/username/", fd).then(res => {
            if (res.data.message === "이미 존재하는 닉네임입니다.") {
              if (this.previousUsername === this.username) {
                this.valid = true;
              } else {
                this.valid = false;
              }
            } else {
              this.valid = true;
            }
            this.errors = this.valid ? [] : ["이미 존재하는 닉네임입니다."];
          });
        }
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),
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
      let resultURL = canvas.toDataURL("image/jpeg", 1);
      let blob = this.dataURItoBlob(resultURL);
      this.image = new File([blob], file.name);
      fd.append("image", this.image);
      http.put("/accounts/min/image/", fd, config).then(res => {
        this.previous = res.data.image;
        this.avatar = null;
      });
    },
    updateInfo() {
      this.saving = true;
      setTimeout(() => this.saveInfo(), 1000);
    },
    saveInfo() {
      this.saving = false;
      this.updated = true;
      this.valid = true;
      this.previousUsername = this.username;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const fd = new FormData();
      fd.append("username", this.username);
      fd.append("intro", this.intro);
      http.put("/accounts/{username}/", fd, config).then(() => {
        // console.log(res);
      });
    },
    ChangePassword() {
      this.$router.push("changePassword");
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
  }
};
</script>

<style>
</style>