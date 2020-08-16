<template>
  <v-container max-width="600" min-width="300">
    <v-row align="center" justify="center">
      <ValidationObserver ref="observer">
        <v-form v-model="valid">
          <ValidationProvider name="previous" rules="required|min:8|max:16" v-slot="{ errors }">
            <v-text-field
              v-model="previous"
              type="password"
              :error-messages="errors"
              label="기존 비밀번호"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="password" rules="required|min:8|max:16" v-slot="{ errors }">
            <v-text-field
              v-model="password"
              :counter="16"
              type="password"
              :error-messages="errors"
              label="변경할 비밀번호"
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
          <v-btn color="primary" :disabled="!valid" class="mr-4" @click="submit">비밀번호 변경</v-btn>
          <v-btn block color="black" class="ma-2 white--text" @click="unsubscribe()">
            <v-icon left dark>mdi-delete</v-icon>탈퇴하기
          </v-btn>
        </v-form>
      </ValidationObserver>
    </v-row>
  </v-container>
</template>

<script>
import { required, max, min } from "vee-validate/dist/rules";
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

extend("passswordConfirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "비밀번호가 일치하지 않습니다"
});
// import { mapActions } from "vuex";
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    previous: "",
    password: "",
    confirmation: "",
    valid: false
  }),
  methods: {
    // ...mapActions(["logout"]),
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        let token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Token ${token}`
          }
        };
        http
          .put(
            "/accounts/password/",
            {
              old_password: this.previous,
              new_password: this.password
            },
            config
          )
          .then(() => {
            this.$router.push("mypage");
          })
          .catch(() => {
            alert(
              "비밀번호 변경에 실패하였습니다. 기존 비밀번호를 다시 확인해주세요"
            );
          });
      }
    },
    unsubscribe() {
      let check = confirm("탈퇴하시겠습니까?");
      if (check) {
        let token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Token ${token}`
          }
        };
        http
          .delete("/accounts/{username}/", config)
          .then(() => {
            alert("그 동안 이용해주셔서 감사합니다.");
            this.$store.dispatch("logout");
            // this.$router.push("home");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push("mypage");
      }
    }
  }
};
</script>
