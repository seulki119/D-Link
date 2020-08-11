<template>
  <!-- <v-container max-width="600" min-width="300" fill-height> -->
  <v-container fill-height>
    <v-card class="mx-auto ma-5" width="100%" max-width="600" fill-height>
      <v-layout column justify-space-between class="pa-5">
        <v-flex fill-height>
          <v-btn
            block
            color="blue"
            height="100px"
            class="white--text"
            router
            :to="{ name: 'videochat' }"
          >화상채팅</v-btn>
        </v-flex>
        <v-flex>
          <v-btn block color="red" height="100px" class="white--text" router :to="{ name: 'vs' }">VS</v-btn>
        </v-flex>
        <v-flex>
          <v-btn
            block
            color="green"
            height="100px"
            class="white--text"
            router
            :to="{ name: 'cocktail' }"
          >칵테일</v-btn>
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