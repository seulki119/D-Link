<template>
  <v-container max-width="600" min-width="250" fill-height>
    <v-card class="mx-auto ma-5" max-width="600" height="100%">
      <v-layout row wrap fill-height>
        <v-flex xs12 sm12 md4 lg4 x12>
          <!-- <div> -->
          <v-btn block color="blue" height="100%" class="ma-2 white--text">화상채팅</v-btn>
          <!-- </div> -->
        </v-flex>
        <v-flex xs12 sm12 md4 lg4 x12>
          <v-btn block color="red" height="100%" class="ma-2 white--text">VS</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4 x12>
          <v-btn block color="green" height="100%" class="ma-2 white--text">칵테일</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>