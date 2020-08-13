<template>
  <v-container fill-height>
    <v-card class="mx-auto" width="100%" max-width="600">
      <v-layout column justify-space-between class="pa-10 text-center indigo lighten-2 white--text">
        <p v-if="!hidden" style="font-size:x-large" class="mb-0">칵테일 취향 검사</p>
        <p v-else style="font-size:x-large" class="mb-0">{{userName}}님의 취향은...</p>
      </v-layout>
      <hr />

      <v-layout
        column
        justify-space-between
        class="pa-5 text-center indigo lighten-2 white--text"
        style="font-size:large;"
      >
        <!-- tab -->
        <v-tabs v-show="!hidden" center-active v-model="tab" background-color="white">
          <v-tab v-for="(item, index) in items" :key="item.name">{{ index+1 }}</v-tab>
        </v-tabs>

        <!-- content -->
        <v-tabs-items v-show="!hidden" v-model="tab">
          <v-tab-item v-for="(item, index) in items" :key="item.tab">
            <!-- image -->
            <v-img
              :src="require(`@/assets/cocktail/image${index+1}.png`)"
              aspect-ratio="1.4"
              contain
              class="grey lighten-2"
              max-height="300"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <!-- content -->
            <v-card flat>
              <v-layout column justify-space-between class="pa-5">
                <v-card-text>{{item.content}}</v-card-text>
                <v-row justify="space-around">
                  <v-radio-group v-model="item.score" row class="fill-height">
                    <v-radio label="하" value="1"></v-radio>
                    <v-radio label="중" value="2"></v-radio>
                    <v-radio label="상" value="3"></v-radio>
                  </v-radio-group>
                </v-row>
              </v-layout>
            </v-card>
            <!-- submit botton : 모든 문항에 응답한 경우, 마지막 검사문항에서 보여줌  -->
            <div class="text-center ma-2" v-show="index === items.length-1">
              <v-btn
                block
                color="indigo lighten-1 white--text"
                @click="submit"
                :disabled="!valid"
              >결과 보기</v-btn>
            </div>
          </v-tab-item>
        </v-tabs-items>

        <!-- 결과 레시피 출력 -->
        <v-card>
          <v-img
            v-if="hidden"
            :src="require(`@/assets/cocktail/${cocktail}.png`)"
            class="grey lighten-2 pa-10"
            max-width="100%"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userName"])
  },
  data() {
    return {
      cocktail: "레몬주",
      hidden: false,
      valid: false,
      tab: null,
      // 취향 검사 문항
      items: [
        {
          name: "도수",
          content: "알콜에 취한 느낌이 좋아 술을 먹는다.",
          score: null
        },
        {
          name: "탄산감",
          content: "술에 탄산감이 있을 때 너무 좋다.",
          score: null
        },
        {
          name: "단맛",
          content: "소주가 맛있다는게 이해가 안간다.",
          score: null
        },
        {
          name: "비주얼",
          content: "한 번 먹어도 예쁜 비주얼로 먹고 싶다.",
          score: null
        },
        {
          name: "도전력",
          content: "특이한 맛에 도전할 의향이 있다.",
          score: null
        },
        {
          name: "간편함",
          content: "술 먹을 때 간단하게 먹고 싶다.",
          score: null
        }
      ],
      // 칵테일 이름과 점수.
      recipes: [
        {
          name: "애플파이칵테일",
          score: 1.35
        },
        {
          name: "쁘띠쁘띠주",
          score: 1.37
        },
        {
          name: "죠스바칵테일",
          score: 1.72
        },
        {
          name: "아침에좋은사과로몹쓸짓칵테일",
          score: 1.75
        },
        {
          name: "깔루아밀크",
          score: 1.84
        },
        {
          name: "이슬톡톡자몽칵테일",
          score: 1.87
        },
        {
          name: "레몬주",
          score: 1.88
        },
        {
          name: "드라큘라칵테일",
          score: 1.92
        },
        {
          name: "깻잎모히또",
          score: 1.97
        },
        {
          name: "탄산봉봉주",
          score: 2.03
        },
        {
          name: "사파이어칵테일",
          score: 2.05
        },
        {
          name: "레몬끌라라",
          score: 2.1
        },
        {
          name: "페이크맥콜칵테일",
          score: 2.36
        },
        {
          name: "메로나주",
          score: 2.12
        },
        {
          name: "우리함께신기록칵테일",
          score: 2.14
        },
        {
          name: "팝앤샷칵테일",
          score: 2.27
        },
        {
          name: "블루레몬에이드밀키스주",
          score: 2.3
        },
        {
          name: "페이크보리차",
          score: 2.31
        },
        {
          name: "소망주",
          score: 2.35
        },
        {
          name: "토마토레드아이",
          score: 2.52
        },
        {
          name: "블루체리칵테일",
          score: 2.53
        },
        {
          name: "밀키스주",
          score: 2.68
        }
      ]
    };
  },
  watch: {
    items: {
      handler: function() {
        this.check();
      },
      deep: true
    }
  },
  methods: {
    check() {
      let tmp = true;
      // some()은 조건이 true가 되는 순간 break
      this.items.some(item => {
        if (item.score === null) {
          tmp = false;
        }
      });
      this.valid = tmp;
    },
    submit() {
      this.hidden = true;
      //가중치 계산
      var result = 0;
      this.items.forEach((item, index) => {
        switch (index) {
          case 0:
            result += parseInt(item.score) * 0.25;
            break;
          case 1:
            result += parseInt(item.score) * 0.18;
            break;
          case 2:
            result += parseInt(item.score) * 0.05;
            break;
          case 3:
            result += parseInt(item.score) * 0.17;
            break;
          case 4:
            result += parseInt(item.score) * 0.3;
            break;
          case 5:
            result += parseInt(item.score) * 0.15;
            break;
        }
      });
      result = result.toFixed(2);

      // 결과 수치에 근사한 값의 레시피 출력.
      let arr = this.findCocktail(result);

      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.score == result) {
          // result score와 일치하는 값이 있는 경우 : 해당 값 출력
          if (element.name !== null) {
            this.cocktail = element.name;
            break;
          } else {
            // 없는 경우 : 가장 차이가 적은 값을 출력

            let nearest = null;
            if (index === 0) {
              nearest = arr[1];
            } else if (index === arr.length - 1) {
              nearest = arr[index - 1];
            } else {
              let before = parseFloat(arr[index - 1].score);
              let after = parseFloat(arr[index + 1].score);
              nearest =
                result - before < after - result
                  ? arr[index - 1]
                  : arr[index + 1];
            }
            this.cocktail = nearest.name;
            break;
          }
        }
      }
    },
    // recipes array sort by score
    sortedArray(array) {
      return array.sort((a, b) => a.score - b.score);
    },
    findCocktail(result) {
      // recipes에 결과값 추가하여 score로 정렬
      let cocktails = this.recipes;
      const element = {
        name: null,
        score: result
      };
      cocktails.push(element);
      return this.sortedArray(cocktails);
    }
  }
};
</script>

<style>
</style>