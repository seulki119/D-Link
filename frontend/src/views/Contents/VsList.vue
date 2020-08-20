<template>
  <v-container max-width="600" min-width="300">
    <v-card class="mx-auto pa-5" max-width="600" min-width="300">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <!-- prop이나 param으로 index 전달하기. -->
            <v-card :to="{ name: 'vs', params:{no:i} }">
              <div class="d-flex flex-no-wrap justify-space-between">
                <!-- <v-col cols="6" sm="4"> -->
                <v-avatar class="ma-auto" size="40%" tile>
                  <v-img :src="`//i3b307.p.ssafy.io/${item.image[0]}`" aspect-ratio="1"></v-img>
                </v-avatar>
                <!-- </v-col> -->
                <v-card-title>VS</v-card-title>

                <!-- <v-col cols="6" sm="4"> -->
                <v-avatar class="ma-auto" size="40%" tile>
                  <v-img :src="`//i3b307.p.ssafy.io/${item.image[1]}`" aspect-ratio="1"></v-img>
                </v-avatar>
                <!-- </v-col> -->
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>


<script>
import http from "@/util/http-common";

export default {
  data: () => ({
    items: []
  }),
  created() {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http
      .get("versus", config)
      .then(res => {
        // console.log(res.data);

        for (let index = 0; index < res.data.length; index++) {
          //   const element = array[index];
          let data = res.data[index];
          let tmp = { id: [], image: [], topic: [], createdAt: "" };

          tmp.id = data.id;
          tmp.createdAt = data.createdAt;
          tmp.image.push(data.image_A);
          tmp.image.push(data.image_B);
          tmp.topic.push(data.topic_A);
          tmp.topic.push(data.topic_B);

          this.items.push(tmp);

          // 이미 투표한 항목은 회색표시?
          // let userId = this.$store.getters.userId;
          // if (data.select_A.includes(userId)) {
          //   this.selected = true;
          //   this.last = 0;
          // } else if (data.select_B.includes(userId)) {
          //   this.selected = true;
          //   this.last = 1;
          // }
        }
        console.log(this.items);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style >
.img {
  position: relative;
  background-image: url(`//i3b307.p.ssafy.io/${item[0].image[1]}`);
  height: 100vh;
  background-size: cover;
}
.img-cover {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.img .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  color: white;
  z-index: 2;
  text-align: center;
}
</style>