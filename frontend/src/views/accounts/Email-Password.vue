<template>
  <v-container max-width="600" min-width="300">
    <v-row align="center" justify="center">
      <v-form>
        <v-text-field
          v-model="templateParams.target_email"
          name="user_email"
          label="이메일"
          @keypress.enter="sendTest"
          required
        ></v-text-field>
        <v-btn color="error" depressed block large @click="sendTest">비밀번호찾기</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import emailjs from "emailjs-com";
import http from "@/util/http-common";

export default {
  name: "emailpw",
  data() {
    return {
      token: "",
      templateParams: {
        from_name: "D_LINK",
        company_email: "d_link.com",
        target_email: "",
        message_html: `https://i3b307.p.ssafy.io/emailpwchange/`
      }
    };
  },
  methods: {
    sendTest() {
      console.log(this.templateParams);

      http
        .get(`/accounts/${this.templateParams.target_email}/emailpw/`)
        .then(res => {
          console.log(res.data);
          this.templateParams.message_html += res.data;
          emailjs
            .send(
              "gmail",
              "template_Bb6olUlG",
              this.templateParams,
              "user_M9vvPfnsBcPdxG5CdE1mQ"
            )
            .then(
              function(response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function(error) {
                console.log("FAILED...", error);
              }
            );
        });
    }
  }
};
</script>