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
              <v-avatar size="136px" v-ripple v-if="!previous" class="grey lighten-3">
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
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="email" label="Email" disabled></v-text-field>
            <v-textarea v-model="intro" label="Intro"></v-textarea>
          </v-row>
          <v-slide-x-transition>
            <v-btn
              block
              color="blue-grey"
              class="ma-2 white--text"
              v-if="!updated"
              @click="updateInfo"
              :loading="saving"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-slide-x-transition>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
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
      intro: "",
      email: "",
      username: ""
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
    username: {
      handler: function() {
        let token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Token ${token}`
          }
        };
        const fd = new FormData();
        fd.append("username", this.username);

        http.post("/accounts/duplicated/username/", fd, config).then(res => {
          console.log(res);
        });
      }
    }
  },
  methods: {
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
        this.intro = res.data.intro;
        this.username = res.data.username;
        this.email = res.data.email;
        console.log(this.previous);
      });
    },
    updateInfo() {
      this.saving = true;
      setTimeout(() => this.saveInfo(), 1000);
    },
    saveInfo() {
      this.saving = false;
      this.updated = true;
      // let token = localStorage.getItem("token");
      // let config = {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // };
      //api 연결하고 추가함녀 왈~~
      // const fd = new FormData();
    }
  }
};
</script>

<style>
</style>