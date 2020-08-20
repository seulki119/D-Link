<template>
  <v-container class="fill-height" fluid max-width="500" min-width="300">
    <v-card class="mx-auto pa-5" max-width="480">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h4>최애술 2개를 선택하여 가입을 완료해보세요</h4>
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col v-for="(n, index) in items" :key="index" class="d-flex child-flex" cols="4">
                  <v-card flat tile>
                    <v-img
                      :src="
                        require(`@/assets/taste/D_${n.name}.jpg`)
                      "
                      :lazy-src="
                        `https://picsum.photos/10/6?image=${index * 5 + 10}`
                      "
                      aspect-ratio="1"
                      class="rounded-circle"
                      @click="selectAction(n)"
                      :style="{ cursor: pointer, border: n.isIn }"
                    ></v-img>
                    <v-card-text align="center" justify="center">
                      {{
                      n.name
                      }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-btn :disabled="selected.length != 2" @click="submit">가입하기</v-btn>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  data: () => ({
    items: [
      { name: "맥주", isIn: "", src: "/static/img/kakao_login_button_round.55b2ddfe.png" },
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
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      };

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
          alert("회원가입이 완료되었습니다.\nWelcome to d-link!");
          this.$store.dispatch("getUserInfo");
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>
