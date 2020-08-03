<!-- 
탭으로 기본 정보 수정 페이지 / 비밀번호 수정 페이지로 구분할 예정
1. 기본정보 수정페이지
 -> 게시물 업로드 게시판과 비슷하게 구성
  -> 이미지 미리보기 + 업로드 / 삭제도 구현
  -> O형태로 미리 보기 할 예정
  -> 바로 아래에 textarea로 Intro 작성 가능하게 만들예정

2. 비밀번호 수정 페이지
  -> 기존 비밀번호 입력
  -> 새 비밀번호 + 확인 과정
  -> 버튼 클릭시 수정
-->
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
