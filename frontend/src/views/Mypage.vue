<!-- eslint-disable -->
<!--
1. 회원 아이디 기반으로 정보 가져오기
2. 회원이 스크랩한 게시물 목록
3. 회원이 업로드한 게시물 목록
4. 회원정보 관련 버튼(disabled 처리)
      - 수정
        -탈퇴
      - 로그아웃

-->
<template>
  <div>
    <h1>{{userInfo.username}}님 환영합니다.</h1>
    <h1>{{userInfo.username}}님 왜그러세요 ㅠㅠ</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
