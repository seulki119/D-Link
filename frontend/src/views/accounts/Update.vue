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
  <v-container class="mx-auto" max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="590" min-width="290">
      <v-row class="pa-5" no-gutters>
        <v-col>
          <image-input v-model="avatar">
            <div slot="activator">
              <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                <span>Click to add avatar</span>
              </v-avatar>
              <v-avatar size="150px" v-ripple v-else class="mb-3">
                <img :src="`//127.0.0.1:8000/${avatar}`" alt="avatar" />
              </v-avatar>
            </div>
          </image-input>
        </v-col>
        <!-- <v-divider></v-divider>
        <v-col>
          <v-row>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{username}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <span>{{intro}}</span>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-col>-->
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import { mapState, mapActions } from "vuex";
import http from "@/util/http-common";
import ImageInput from "./ImageInput.vue";
export default {
  data() {
    return {
      avatar: null,
      email: "",
      id: "",
      intro: "",
      username: ""
    };
  },
  components: {
    ImageInput: ImageInput
  },
  created() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/accounts/{temp}/", "", config).then(res => {
      this.id = res.data.id;
      this.avatar = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = res.data.email;
    });
  },
  updated() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/accounts/{temp}/", "", config).then(res => {
      this.id = res.data.id;
      this.avatar = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = res.data.email;
    });
  }
};
</script>
