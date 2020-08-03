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
  <!-- <v-container class="mx-auto" max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="590" min-width="290">
      <v-img :src="preview" class="img-fluid ma-5" />
      <v-file-input
        small-chips
        color="deep-purple accent-4"
        accept="image/*"
        label="Uplode a Image"
        prepend-icon="mdi-plus"
        dense
        :show-size="1000"
        v-model="file"
        @change="add"
        class="pt-6 mx-6"
      ></v-file-input>
      <v-divider></v-divider>
      <v-combobox
        class="pt-6"
        v-model="tag"
        :items="items"
        label="태그 입력하세요"
        :maxlength="max"
        @keypress="isNotSpecail"
        multiple
        chips
        dense
      ></v-combobox>
      <v-divider></v-divider>
      <v-card-text class="text--primary">
        <v-textarea v-model="content" label="내용" counter maxlength="120" full-width single-line></v-textarea>
      </v-card-text>

      <v-divider></v-divider>
      <v-btn block color="blue-grey" class="ma-2 white--text" @click="upload" v-if="fill">
        Upload
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-card>
  </v-container>-->
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from "@/util/http-common";
export default {
  data() {
    return {
      file: null,
      reader: null,
      preview: null,
      email: "",
      id: "",
      image: "",
      intro: "",
      username: ""
    };
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
      this.image = res.data.image;
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.email = this.userInfo.email;
    });
  },
  methods: {
    add() {
      this.reader = new FileReader();
      this.reader.onloadend = () => {
        let fileData = this.reader.result;
        this.preview = fileData;
        // send to server here...
      };
      if (this.file) {
        this.reader.readAsDataURL(this.file);
      }
    },
    upload() {
      // 나중에 create 제거 해야함
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };

      const fd = new FormData();
      fd.append("image", this.file);
      http
        .post("자기 아바타 이미지 올리는 링크", fd, config)
        .then(res => {
          console.log(res);
          this.$router.push("mypage");
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>
