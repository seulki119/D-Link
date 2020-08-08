<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <ValidationObserver ref="observer">
        <v-form v-model="valid">
          <!-- <ValidationProvider v-slot="{ errors }" name="email" rules="required|email"> -->
          <v-text-field v-model="email" :error-messages="errorsEmail" label="이메일" required></v-text-field>
          <!-- </ValidationProvider> -->

          <ValidationProvider name="password" rules="required|min:8|max:16" v-slot="{ errors }">
            <v-text-field
              v-model="password"
              :counter="16"
              type="password"
              :error-messages="errors"
              label="비밀번호"
              required
              maxlength="16"
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider
            name="confirm"
            rules="required|passswordConfirm:@password"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="confirmation"
              :counter="password.length"
              type="password"
              :error-messages="errors"
              label="비밀번호 확인"
              required
              :maxlength="password.length"
            ></v-text-field>
          </ValidationProvider>

          <!-- <ValidationProvider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >-->
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errorsName"
            label="닉네임"
            required
            maxlength="10"
          ></v-text-field>
          <!-- </ValidationProvider> -->

          <ValidationProvider v-slot="{ errors }" rules="agree" name="checkbox">
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="1"
              label="약관"
              type="checkbox"
              required
            ></v-checkbox>
          </ValidationProvider>

          <v-btn color="primary" :disabled="!valid" class="mr-4" @click="submit">다음</v-btn>
        </v-form>
      </ValidationObserver>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import http from "@/util/http-common";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "필수 입력칸입니다."
});

extend("min", {
  ...min,
  message: "{length} 자 이상이어야 합니다"
});

extend("max", {
  ...max,
  message: "{length} 자 까지만 가능합니다"
});

extend("email", {
  ...email,
  message: "이메일 형식이 아닙니다"
});

extend("passswordConfirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "비밀번호가 일치하지 않습니다"
});
extend("agree", {
  ...required,
  message: "약관을 동의해주세요"
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmation: "",
    checkbox: null,
    errorsEmail: [],
    errorsName: [],
    valid: false
  }),
  watch: {
    email() {
      let valid = false;

      if (this.email.length === 0) {
        valid = false;
        this.errorsEmail = valid ? [] : ["필수 입력칸입니다."];
      } else {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!re.test(this.email)) {
          valid = false;
          this.errorsEmail = valid ? [] : ["이메일 형식이 아닙니다"];
        } else {
          valid = true;
          const fd = new FormData();
          fd.append("email", this.email);
          http.post("/accounts/duplicated/email/", fd).then(res => {
            if (res.data.message === "이미 존재하는 이메일입니다.") {
              valid = false;
            }
            this.errorsEmail = valid ? [] : ["이미 존재하는 이메일입니다."];
          });
        }
      }
    },
    name() {
      let valid = false;

      if (this.name.length === 0) {
        valid = false;
        this.errorsName = valid ? [] : ["필수 입력칸입니다."];
      } else if (this.name.length > 10) {
        valid = false;
        this.errorsName = valid ? [] : ["Max 10 characters"];
      } else {
        var re = /^([\wㄱ-ㅎ가-힣@/./+/-]*)$/;
        if (!re.test(this.name)) {
          valid - false;
          this.errorsName = valid
            ? []
            : ["닉네임은 문자, 숫자, @ . + - _ 만 가능합니다."];
        } else {
          valid = true;
          const fd = new FormData();
          fd.append("username", this.name);
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
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        http
          .post("/rest-auth/signup/", {
            email: this.email,
            username: this.name,
            password1: this.password,
            password2: this.confirmation
          })
          .then(response => {
            console.log(response);
            let token = response.data.key;
            localStorage.setItem("token", token);

            this.$router.push({
              name: "taste",
              params: { username: this.name }
            });
          })
          .catch(response => {
            console.log(response);
          });
      }
    }
  }
};
</script>
