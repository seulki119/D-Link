<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" style="max-width:450px">
        <v-row align-center row wrap>
          <v-flex xs12>
            <v-alert class="mb-3" :value="isError" type="error">이메일과 비밀번호를 확인해주세요.</v-alert>
            <v-alert :value="loginSuccess" type="success">로그인에 성공하였습니다.</v-alert>
            <!-- 차후에는 바로 화면 변경시킬에정!!-->
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>로그인</v-toolbar-title>
              </v-toolbar>
              <div class="pa-3">
                <v-text-field v-model="email" label="이메일을 입력하세요"></v-text-field>
                <v-text-field v-model="password" type="password" label="비밀번호를 입력하세요"></v-text-field>
                <v-btn color="primary" depressed block large @click="login()">로그인</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      allUsers: [
        { id: 1, name: "test", email: "test@gmail.com", password: "123456" }
      ],
      isError: false,
      loginSuccess: false
    };
  },
  methods: {
    login() {
      let selectedUser = null;
      this.allUsers.forEach(user => {
        if (user.email === this.email) selectedUser = user;
      });
      selectedUser === null
        ? (this.isError = true)
        : selectedUser.password !== this.password
        ? (this.isError = true)
        : (this.loginSuccess = true);
      console.log(this.email, this.password);
    }
  }
};
</script>