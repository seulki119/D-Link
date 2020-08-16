<template>
  <v-container class="mx-auto" max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="590" min-width="290">
      <clipper-fixed class="my-clipper" ref="clipper" :src="preview">
        <div class="placeholder" slot="placeholder">No image</div>
      </clipper-fixed>
      <v-file-input
        small-chips
        color="deep-purple accent-4"
        accept="image/*"
        label="Uplode a Image"
        prepend-icon="mdi-plus"
        dense
        :show-size="1000"
        v-model="file"
        @change="add($event)"
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
      max: 20,
      imgURL: "",
      resultURL: ""
    };
  },
  created() {
    let token = localStorage.getItem("token");

    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/articles/hashtag/", "", config).then(res => {
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
      const canvas = this.$refs.clipper.clip(); //call component's clip method
      this.resultURL = canvas.toDataURL("image/jpeg", 0.6);
      let blob = this.dataURItoBlob(this.resultURL);
      this.file = new File([blob], this.file.name);
      fd.append("image", this.file);
      fd.append("content", this.content);
      fd.append("hashtag", this.tags);
      http
        .post("/articles/", fd, config)
        .then(res => {
          console.log(res);
          this.$router.push("articlelist");
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