<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" offset-sm="3">
        <h4>최애술 2개를 선택하여 가입을 완료해보세요</h4>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col v-for="(n, index) in items" :key="index" class="d-flex child-flex" cols="4">
                <v-card flat tile>
                  <v-img
                    :src="
                      `https://picsum.photos/500/300?image=${index * 5 + 10}`
                    "
                    :lazy-src="
                      `https://picsum.photos/10/6?image=${index * 5 + 10}`
                    "
                    aspect-ratio="1"
                    class="rounded-circle"
                    @click="selectAction(n)"
                    :style="{cursor: pointer, border:n.isIn}"
                  ></v-img>
                  <v-card-text>{{ n.name }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-btn color="primary" :disabled="selected.length != 2" @click="submit">가입하기</v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  data: () => ({
    items: [
      { name: "맥주", isIn: "" },
      { name: "소주", isIn: "" },
      { name: "사케", isIn: "" },
      { name: "막걸리", isIn: "" },
      { name: "와인", isIn: "" },
      { name: "양주", isIn: "" },
      { name: "고량주", isIn: "" },
      { name: "칵테일", isIn: "" }
    ],
    selected: [],
    myBorder: "3px solid #2E86C1",
    pointer: "pointer"
  }),
  // created() {
  // //Signup에서 데이터 제대로 받아오는지 테스트
  //   console.log(this.$route.params);
  // },
  methods: {
    selectAction(n) {
      if (!this.selected.includes(n.name)) {
        // 선택하지 않은 옵션을 클릭했을 경우 - add
        if (this.selected.length < 2) {
          this.selected.push(n.name);
          n.isIn = this.myBorder;
        }
      } else {
        // 이미 선택된 옵션 클릭시 - remove
        // this.selected.pop(n.name);
        let i = this.selected.indexOf(n.name);
        this.selected.splice(i, 1);
        n.isIn = "";
      }
      console.log(this.selected);
    },
    submit() {
      // 회원가입처리
      http
        .post("/rest-auth/signup/", this.$route.params)
        .then(response => {
          let token = response.data.key;
          localStorage.setItem("token", token);
          let config = {
            headers: {
              Authorization: `Token ${token}`
            }
          };
          console.log(response);
          // 회원가입처리 성공시 취향 처리
          http
            .post(
              "/accounts/taste/",
              {
                username: this.$route.params.username,
                taste1: this.selected[0],
                taste2: this.selected[1]
              },
              config
            )
            .then(response => {
              // 취향선택 성공시 피드리스트로 이동.
              console.log(response.data.message);
              // console.log(response);
              this.$store.dispatch("getUserInfo");
            })
            .catch(response => {
              console.log(response);
            });
        })
        .catch(response => {
          // 회원가입 실패시 다시 가입페이지로 이동.
          console.dir(response.data);
          this.$router.push("signup");
        });
    }
  }
};
</script>
