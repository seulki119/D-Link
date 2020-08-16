<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-layout row wrap class="pa-5">
        <v-flex>
          <v-container v-model="info">
            <v-text-field v-model="username" label="Username" :error-messages="errors"></v-text-field>
            <v-text-field v-model="email" label="Email" disabled></v-text-field>
            <v-textarea v-model="intro" label="Intro"></v-textarea>
          </v-container>
          <v-slide-x-transition>
            <v-btn
              block
              color="blue-grey"
              class="ma-2 white--text"
              v-if="!updated&&valid"
              @click="updateInfo"
              :loading="saving"
            >
              회원정보수정
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-slide-x-transition>
          <v-btn block color="black" class="ma-2 white--text" @click="passwordChange()">
            <v-icon left dark>mdi-key-variant</v-icon>패스워드 변경
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from "@/util/http-common";
export default {
  name: "app",
  data() {
    return {
      info: null,
      saving: false,
      saved: false,
      updated: true,
      valid: true,
      intro: "",
      email: "",
      username: "",
      previousUsername: "",
      errors: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http.post("/accounts/{temp}/", "", config).then(res => {
      this.intro = res.data.intro;
      this.username = res.data.username;
      this.previousUsername = res.data.username;
      this.email = this.userInfo.email;
    });
  },
  watch: {
    info: {
      handler: function() {
        this.updated = false;
      }
    },
    username() {
      if (this.username.length === 0) {
        this.valid = false;
        this.errors = this.previousUsernamevalid ? [] : ["required"];
      } else if (this.username.length > 10) {
        this.valid = false;
        this.errors = this.valid ? [] : ["Max 10 characters"];
      } else {
        this.valid = true;
        const fd = new FormData();
        fd.append("username", this.username);
        http.post("/accounts/duplicated/username/", fd).then(res => {
          if (res.data.message === "이미 존재하는 닉네임입니다.") {
            if (this.previousUsername === this.username) {
              this.valid = true;
            } else {
              this.valid = false;
            }
          } else {
            this.valid = true;
          }
          this.errors = this.valid ? [] : ["이미 존재하는 닉네임입니다."];
        });
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),

    updateInfo() {
      this.saving = true;
      setTimeout(() => this.saveInfo(), 1000);
    },
    saveInfo() {
      this.saving = false;
      this.updated = true;
      this.valid = true;
      this.previousUsername = this.username;
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      const fd = new FormData();
      fd.append("username", this.username);
      fd.append("intro", this.intro);
      http.put("/accounts/{username}/", fd, config).then(() => {
        // console.log(res);
      });
    },
    passwordChange() {
      this.$router.push("passwordChange");
    }
  }
};
</script>

<style>
</style>