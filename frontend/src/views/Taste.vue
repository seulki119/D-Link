<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" offset-sm="3">
        <h4>최애술 2개를 선택하여 가입을 완료해보세요</h4>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col v-for="(n, index) in items" :key="n" class="d-flex child-flex" cols="4">
                <v-card flat tile>
                  <v-img
                    outlined
                    color="indigo"
                    :src="`https://picsum.photos/500/300?image=${index * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2 rounded-circle"
                    @click="selectAction(n)"
                    style="cursor: pointer;"
                  ></v-img>
                  <v-card-text>{{ n }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-btn color="primary" :disabled="selected.length!=2" @click="submit">가입하기</v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    items: [
      "맥주",
      "소주",
      "사케",
      "막걸리",
      "와인",
      "양주",
      "고량주",
      "칵테일"
    ],
    selected: []
  }),
  methods: {
    selectAction(n) {
      if (!this.selected.includes(n)) {
        // 선택하지 않은 옵션을 클릭했을 경우 - add
        if (this.selected.length < 3) {
          this.selected.push(n);
        }
      } else {
        // 이미 선택된 옵션 클릭시 - remove
        this.selected.pop(n);
      }
      console.log(this.selected);
    },
    submit() {
      // 회원가입처리
      // 백앤드 통신 추가.
      // 성공시 메인화면으로 이동.(피드리스트)
      // this.$router.push("");
    }
  }
};
</script>