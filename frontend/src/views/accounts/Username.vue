<template>
  <v-container class="fill-height" fluid max-width="500" min-width="300">
    <v-card class="mx-auto pa-5" max-width="480">
      <v-row align="center" justify="center">
        <ValidationObserver ref="observer">
          <v-form v-model="valid">
            <h4>앞으로 사용할 유저네임을 정해주세요!</h4>
            <v-text-field
              v-model="username"
              :counter="10"
              :error-messages="errorsName"
              label="닉네임"
              required
              maxlength="10"
              @keydown.enter="saveInfo"
            ></v-text-field>
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-btn color="primary" :disabled="!valid" @click="updateInfo">유저네임 저장</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, setInteractionMode } from "vee-validate";
import http from "@/util/http-common";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "필수 입력칸입니다."
});

extend("max", {
  ...max,
  message: "{length} 자 까지만 가능합니다"
});
export default {
  components: {
    ValidationObserver
  },
  data: () => ({
    username: "",
    errorsName: [],
    valid: false
  }),
  watch: {
    username() {
      let valid = false;
      console.log(this.username);
      if (this.username.length === 0) {
        valid = false;
        this.errorsName = valid ? [] : ["필수 입력칸입니다."];
      } else if (this.username.length > 10) {
        valid = false;
        this.errorsName = valid ? [] : ["Max 10 characters"];
      } else {
        var re = /^([\wㄱ-ㅎ가-힣/./+/-]*)$/;
        if (!re.test(this.username)) {
          valid - false;
          this.errorsName = valid
            ? []
            : ["닉네임은 문자, 숫자, +, -, _ 만 가능합니다."];
        } else {
          valid = true;
          const fd = new FormData();
          fd.append("username", this.username);
          http.post("/accounts/duplicated/username/", fd).then(res => {
            if (res.data.message === "이미 존재하는 닉네임입니다.") {
              valid = false;
            }
            this.errorsName = valid ? [] : ["이미 존재하는 닉네임입니다."];
          });
        }
      }
    }
  },
  methods: {
    saveInfo() {
      this.valid = true;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const fd = new FormData();
      fd.append("username", this.username);
      fd.append("intro", "자기소개");
      http.put("/accounts/{username}/", fd, config).then(() => {
        alert("주류 취향을 선택하고 d-link를 이용해주세요!");
        this.$router.push({
          name: "taste",
          params: { username: this.username }
        });
      });
    }
  }
};
</script>

<style>
</style>