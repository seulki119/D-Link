<!-- 1. HashTag DB에서 hashTag 목록 불러오기 Axios 활용해서 해결하기
    (차후 erd를 1:N 식으로 바꿀수도 있다)
    2. 차후 tag Chip 색상 설정 or 대문자 추가하기
    3. 이미지 필터링 기능 추가하기
-->

<template>
  <v-container class="mx-auto" max-width="600" min-width="300">
    <v-card class="pa-5" max-width="590" min-width="290">
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
  </v-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      file: null,
      reader: null,
      preview: null,
      tag: [],
      tags: "",
      items: [],
      content: null,
      fill: false,
      max: 20
    };
  },
  created() {
    http.post("/articles/hashtag/").then(res => {
      let tmp = [];
      for (let t in res.data) {
        tmp.push(res.data[t].tag);
      }
      this.items = tmp;
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
    check() {
      if (this.tag.length > 0 && this.file && this.content) {
        this.fill = true;
      } else {
        this.fill = false;
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
      for (var t in this.tag) {
        this.tags += "#";
        this.tags += this.tag[t];
      }

      const fd = new FormData();
      fd.append("image", this.file);
      fd.append("content", this.content);
      fd.append("hashtag", this.tags);
      http
        .post("/articles/", fd, config)
        .then(res => {
          console.log(res);
          this.$router.push("home");
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    isNotSpecail($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (
        (keyCode >= 123 && keyCode <= 130) ||
        (keyCode >= 32 && keyCode <= 47) ||
        (keyCode >= 58 && keyCode <= 64) ||
        (keyCode >= 91 && keyCode <= 96)
      ) {
        $event.preventDefault();
      }
    }
  },
  watch: {
    reader() {
      if (!this.file) {
        this.preview = null;
        this.reader = null;
      }
      this.check();
    },
    tag() {
      this.check();
    },
    content() {
      this.check();
    }
  }
};
</script>

<style scoped lang="scss">
</style>