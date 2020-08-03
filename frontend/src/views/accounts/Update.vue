<template></template>

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
  methods(){
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
        .post("/articles/", fd, config)
        .then(res => {
          console.log(res);
          this.$router.push("mypage");
        })
        .catch(err => {
          console.log(err.response);
        });
    },
  }
};
</script>
