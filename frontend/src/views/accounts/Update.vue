<!-- 
Row로 나눈다
1. 아바타 
  -> 클릭시 이미지 변경 / 삭제 가능

2. 개인정보
  -> 닉네임
  -> Intro
  수정 가능하게 하고 저장 버튼 구현 / 저장과 동시에 서버에 업데이트
  + 수정 후 저장 안했을경우 뒤로가기시 팝업 띄우기!

3. 추가 기능 이런식으로 숨기기??
  비밀번호 변경 (기존 + 새 비번 + 비번 확인)
  탈퇴 기능(최소 2번이상 묻기)
-->
<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-row class="pa-5" no-gutters>
        <v-col>
          <image-input v-model="avatar">
            <div slot="activator">
              <v-avatar size="136px" v-ripple v-if="!previous && !avatar" class="grey lighten-3">
                <span>Click to add avatar</span>
              </v-avatar>
              <v-avatar size="136px" v-ripple v-else-if="!avatar">
                <img :src="`//127.0.0.1:8000/${previous}`" alt />
              </v-avatar>
              <v-avatar size="136px" v-ripple v-else>
                <img :src="avatar.imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </image-input>
          <v-slide-x-transition>
            <div v-if="avatar && saved == false">
              <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
            </div>
          </v-slide-x-transition>
        </v-col>
        <v-col>
          <v-row v-model="info">
            <v-text-field v-model="username" label="Username" :error-messages="errors"></v-text-field>
            <v-text-field v-model="email" label="Email" disabled></v-text-field>
            <v-textarea v-model="intro" label="Intro"></v-textarea>
          </v-row>
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
          <v-btn block color="black" class="ma-2 white--text" @click="passwordChange()">
            <v-icon left dark>mdi-key-variant</v-icon>패스워드 변경
          </v-btn>
          <v-btn block color="black" class="ma-2 white--text" @click="logout()">
            <v-icon left dark>mdi-logout</v-icon>로그아웃
          </v-btn>
        </v-col>
      </v-row>
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
        this.errors = this.previousUsernamevalid ? [] : ["required"];
      } else if (this.username.length > 10) {
        this.valid = false;
        this.errors = this.valid ? [] : ["Max 10 characters"];
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
      this.image = this.avatar.formData.get("file");
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const fd = new FormData();
      fd.append("image", this.image);

      http.put("/accounts/min/image/", fd, config).then(res => {
        this.previous = res.data.image;
        // console.log(this.previous);
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
    passwordChange() {
      this.$router.push("passwordChange");
    }
  }
};
</script>

<style>
</style>