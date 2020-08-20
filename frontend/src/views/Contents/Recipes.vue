<template>
  <v-container fill-height>
    <v-card class="mx-auto" width="100%" max-width="600">
      <v-layout column justify-space-between class="pa-10 text-center">
        <p style="font-size:x-large" class="mb-0">d-link 칵테일 레시피</p>
      </v-layout>
      <hr />
      <v-col cols="12" sm="6" md="4">
        <v-text-field placeholder="칵테일 이름으로 검색" @keydown.enter="search" v-model="keyword"></v-text-field>
      </v-col>
      <!-- 레시피 출력 -->
      <v-layout
        column
        justify-space-between
        class="pa-5 text-center"
        style="font-size:large;"
        v-for="item in items"
        :key="item.score"
      >
        <v-card>
          <v-img
            :src="require(`@/assets/cocktail/${item.name}.png`)"
            class="pa-10"
            max-width="100%"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      keyword: null,
      items: this.$route.params.recipes
    };
  },
  methods: {
    search() {
      if (this.keyword === null) {
        this.items = this.$route.params.recipes;
      } else {
        let arr = this.$route.params.recipes;
        let tmp = [];
        arr.some(item => {
          if (item.name.includes(this.keyword)) {
            tmp.push(item);
          }
        });
        this.items = tmp;
      }
    }
  }
};
</script>