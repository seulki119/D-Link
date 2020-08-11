<template>
  <!-- <v-container max-width="600" min-width="300" fill-height> -->
  <v-container fill-height>
    <v-card class="mx-auto ma-5" width="100%" max-width="600" fill-height>
      <v-layout row wrap class="pa-5" flex-column height="100%">
        <v-flex>
          <v-btn block color="blue" height="100px" class="white--text">화상채팅</v-btn>
        </v-flex>
        <v-flex>
          <v-btn block color="red" height="100px" class="white--text">VS</v-btn>
        </v-flex>
        <v-flex>
          <v-btn block color="green" height="100px" class="white--text">칵테일</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
  <!-- </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      height: ""
    };
  }
};
</script>