<template>
  <div class="wrapC">
    <div class="wrap">
      <div class="form-wrap">
        <div class="p-wrap">
          <p>가입할 때 사용하신 이메일로<br />변경링크를 보내드릴게요.</p>
        </div>
        <form id="findpw" action="" class="input-group2">
          <input
            type="text"
            id="email"
            v-model="templateParams.target_email"
            class="input-field"
            placeholder="Email"
            required
          />
          <input
            type="submit"
            class="submit mt-5"
            value="submit"
            @click="isemailexist"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import axios from "axios";
export default {
  name: "Findpw",
  data() {
    return {
        templateParams: {
            from_name: "D_LINK",
            message_html: "http://localhost:8000/api/" ,
            company_email: "d_link.com",
            target_email: "",
        },
      item: {},
    };
  },
  methods: {
    isemailexist() {
      console.log('들어는왔니')
      axios
        .post("http://localhost:8000/api/accounts/emailpw", {
          email: this.templateParams.target_email,
        })
        .then(({ data }) => {
          console.log(data)
          this.item = data;
          let msg = "가입된 이메일이 아닙니다.";
          if (this.item.email != null) {
            msg = "입력하신 이메일로 접속해 Code를 확인해주세요.";
          }
          // alert(this.item.email);
          // alert(this.item);
          alert(msg);
          let ranNum = "" + Math.floor(Math.random() * 1000);
          if (this.item.email != null) {
            localStorage.setItem("email", this.item.email);
            this.templateParams.message_html += ranNum;
            localStorage.setItem("code", ranNum);
            emailjs
              .send(
                "jangyohan",
                "template_o0URfWVa",
                this.templateParams,
                "user_mS2iuoZL9jXfcO9047U27"
              )
              .then(
                function(response) {
                  console.log("SUCCESS!", response.status, response.text);
                },
                function(err) {
                  console.log("FAILED...", err);
                }
              );

          }
        })
    },
  },
};
</script>