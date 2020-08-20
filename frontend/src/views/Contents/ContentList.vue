<template>
  <v-card max-width="600" class="mx-auto">
    <v-container max-width="600" min-width="300">
      <v-row>
        <v-col cols="12">
          <v-card color="#D4B3E3" dark router :to="{ name: 'cocktail' }">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h4 font-weight-bold">칵테일</v-card-title>
                <v-card-subtitle class="text-h4">취향조사</v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card color="#EBA2A0" dark router :to="{ name: 'vslist' }">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h4 font-weight-bold">누가</v-card-title>
                <v-card-subtitle class="text-h4">국룰이지?</v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    overlay: false
  }),
  methods: {
    moveCocktail() {
      this.$router.push("cocktail");
    }
  }
};
</script>
<style scoped>
</style>