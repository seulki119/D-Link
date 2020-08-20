<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-flex>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              class="mx-auto ma-5"
              id="contentlist"
              width="100%"
              max-width="600"
              fill-height
              router
              :to="{ name: 'cocktail' }"
            >
              <div id="container">
                <div class="glass">
                  <div class="beer"></div>
                </div>
                <div class="head"></div>
                <div class="pour"></div>
              </div>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out v-card--reveal display-3"
                  style="height: 100%;"
                >칵테일</div>
              </v-expand-transition>
            </v-card>
          </template>
        </v-hover>
      </v-flex>
      <v-flex>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              class="mx-auto ma-5"
              id="contentlist"
              width="100%"
              max-width="600"
              fill-height
              router
              flat
              :to="{ name: 'vslist' }"
            >
              <div id="container">
                <div class="glass">
                  <div class="beer"></div>
                </div>
                <div class="head"></div>
                <div class="pour"></div>
              </div>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out v-card--reveal display-3"
                  style="height: 100%;"
                >VS</div>
              </v-expand-transition>
            </v-card>
          </template>
        </v-hover>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
function cock() {
  function beerRise() {
    document.querySelector(".beer").classList.add("fill");
    document.querySelector(".head").classList.add("active");
    setTimeout(() => {
      document.querySelector(".beer").classList = "beer";
      document.querySelector(".head").classList = "head";
      document.querySelector(".pour").classList = "pour";
      cock();
    }, 5000);
  }
  function pourBeer() {
    document.querySelector(".pour").classList.add("pouring");
    beerRise();
    setTimeout(() => {
      document.querySelector(".pour").classList.add("end");
    }, 1500);
  }
  setTimeout(() => {
    pourBeer();
  }, 1000);
}

export default {
  data: () => ({
    overlay: false
  }),
  created() {
    cock();
  },
  methods: {
    moveCocktail() {
      this.$router.push("cocktail");
    }
  }
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 100;
}
body {
  /* background: #68a0b7; */
}
#container {
  width: 100px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  margin-top: 70px;
}
#container .beer {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fac92c;
  bottom: 0;
  height: 0;
  transition: 1500ms ease-in;
}
#container .beer.fill {
  height: 100%;
}
#container .beer:after {
  content: "";
  position: absolute;
  width: 50%;
  height: 100%;
  background: #ea9602;
  right: 0;
}
#container .glass {
  position: absolute;
  width: 100%;
  height: 100%;
  border: solid 10px #e8e4d9;
  border-top: solid 5px #e8e4d9;
  border-bottom: solid 30px #e8e4d9;
  border-radius: 5px;
  transform: perspective(500px) rotateX(-30deg);
}
#container .glass:before,
#container .glass:after {
  content: "";
  position: absolute;
  border-radius: 10px;
  background: #fff;
  width: 10px;
}
#container .glass:before {
  height: 20%;
  left: 10px;
  top: 5%;
  z-index: 1;
}
#container .glass:after {
  height: 70%;
  right: 10px;
  top: 5%;
}
#container .head {
  position: absolute;
  width: 60%;
  height: 60px;
  background: #fff;
  bottom: -5px;
  left: 5px;
  border-radius: 50%;
  z-index: -1;
}
#container .head.active {
  bottom: 82%;
  transition: 1600ms step-end;
  z-index: 2;
}
#container .head:before,
#container .head:after {
  content: "";
  position: absolute;
  background: #fff;
  border-radius: 50%;
}
#container .head:before {
  width: 30px;
  height: 30px;
  left: 50px;
  top: 15px;
}
#container .head:after {
  width: 40px;
  height: 40px;
  left: 67px;
  top: 9px;
}
#container .pour {
  position: absolute;
  width: 20px;
  height: 200%;
  background: #fac92c;
  border-radius: 20px;
  left: 10px;
  z-index: -1;
  bottom: 150%;
  transition: 300ms ease-in;
}
#container .pour.pouring {
  bottom: 0%;
}
#container .pour.end {
  height: 0;
}
</style>
