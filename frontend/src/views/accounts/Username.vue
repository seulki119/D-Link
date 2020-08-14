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
            ></v-text-field>
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-btn
                  color="primary"
                  :disabled="selected.length != 2"
                  router
                  :to="{ name: 'taste' }"
                >취향 선택하러가기</v-btn>
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

      if (this.username.length === 0) {
        valid = false;
        this.errorsName = valid ? [] : ["필수 입력칸입니다."];
      } else if (this.name.length > 10) {
        valid = false;
        this.errorsName = valid ? [] : ["Max 10 characters"];
      } else {
        var re = /^([\wㄱ-ㅎ가-힣@/./+/-]*)$/;
        if (!re.test(this.username)) {
          valid - false;
          this.errorsName = valid
            ? []
            : ["닉네임은 문자, 숫자, @ . + - _ 만 가능합니다."];
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
  }
};
</script>

<style>
</style>