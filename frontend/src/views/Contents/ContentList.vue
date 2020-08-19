<template>
  <v-container fill-height>
    <v-card class="mx-auto ma-5" width="100%" max-width="600" fill-height>
      <v-layout column justify-space-between class="pa-5">
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
</template>

<script>
export default {};
</script>