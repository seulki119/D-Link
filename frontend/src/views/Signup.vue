<template>
  <v-app id="inspire">
    <v-app-bar app color="#F8C471" dark>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <ValidationObserver ref="observer">
            <v-form v-model="valid">
              <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                <v-text-field v-model="email" :error-messages="errors" label="이메일" required></v-text-field>
              </ValidationProvider>

              <ValidationProvider name="password" rules="required|min:8|max:16" v-slot="{ errors }">
                <v-text-field
                  v-model="password"
                  :counter="16"
                  type="password"
                  :error-messages="errors"
                  label="비밀번호"
                  required
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
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:10">
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :error-messages="errors"
                  label="닉네임"
                  required
                ></v-text-field>
              </ValidationProvider>

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

              <v-btn :disabled="!valid" class="mr-4" @click="submit">다음</v-btn>
            </v-form>
          </ValidationObserver>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="#F8C471" app>
      <v-spacer></v-spacer>

      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { required, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
// import Steps from "./Steps";

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
    // Steps
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmation: "",
    checkbox: null,
    valid: false
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    }
    // clear() {
    //   this.name = "";
    //   this.email = "";
    //   this.password = "";
    //   this.confirmation = "";
    //   this.checkbox = null;
    //   this.$refs.observer.reset();
    // }
  }
};
</script>
