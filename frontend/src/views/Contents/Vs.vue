<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="600">
      <div v-if="!selected">
        <v-toolbar dark flat>
          <v-toolbar-title>당신의 선택은?</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-radio-group v-model="choice" mandatory>
            <v-layout row class="align-end">
              <v-flex column>
                <v-img :src="`//i3b307.p.ssafy.io/${image[0]}`" class="grey lighten-2 ma-3"></v-img>
                <v-radio value="0"></v-radio>
              </v-flex>
              <v-flex column>
                <v-img :src="`//i3b307.p.ssafy.io/${image[1]}`" class="grey lighten-2 ma-3"></v-img>
                <v-radio value="1"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-row>
        <v-divider></v-divider>
        <v-btn block color="indigo lighten-1 white--text" @click="vote()">{{topic[choice]}}에 투표하기</v-btn>
        <button @click="sendChatMessage()">소켓메시지 테스트</button>
      </div>
      <div v-else>
        <v-toolbar dark flat>
          <v-toolbar-title>당신의 선택은 {{topic[last]}}였습니다.</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-layout row class="align-end">
            <v-flex column>
              <v-img :src="`//i3b307.p.ssafy.io/${image[last]}`" class="grey lighten-2 ma-3"></v-img>
            </v-flex>
          </v-layout>
        </v-row>
        <v-diver></v-diver>
        <span>대충 결과 관련 내용 출력</span>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      id: [],
      image: [],
      topic: [],
      createdAt: "",
      select_A: [],
      select_B: [],
      choice: "",
      selected: false,
      last: ""
    };
  },
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
        let data = res.data[0];
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.image.push(data.image_A);
        this.image.push(data.image_B);
        this.topic.push(data.topic_A);
        this.topic.push(data.topic_B);
        console.log(this.image_A);
        let userId = this.$store.getters.userId;
        if (data.select_A.includes(userId)) {
          this.selected = true;
          this.last = 0;
        } else if (data.select_B.includes(userId)) {
          this.selected = true;
          this.last = 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      http
        .get("versus", config)
        .then(res => {
          let data = res.data[0];
          this.createdAt = data.createdAt;
          this.image_A = data.image_A;
          this.image_B = data.image_B;
          console.log(this.image_A);
          let userId = this.$store.getters.userId;
          if (
            data.select_A.includes(userId) ||
            data.select_B.includes(userId)
          ) {
            this.selected = true;
            console.log("이미 선택함");
          } else {
            console.log(userId);
            console.log("아직 선택안함");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    vote() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      let data = new FormData();
      data.append("select", this.choice === 1 ? "A" : "B");
      http.post(`/versus/${this.id}/vote/`, data, config).then(res => {
        console.log(res);
      });
    },
    sendChatMessage() {
      let socket = this.$store.state.chatSocket;
      // 임시데이터
      let data = {
        "message": "채팅메세지",
        "userId": "null",
        "username": "null",
      }
      socket.send(JSON.stringify(data))
    }
  },
  watch: {
    choice() {
      console.log(this.choice);
    }
  },
  beforeCreate() {
    let room = "1"
    let token = localStorage.getItem("token");
    this.$store.dispatch("socketConnect", {
      token: token,
      room: room,
      type: 1, 
    });
  }
};
</script>

<style>
.v-radio {
  text-align: center;
  display: block;
}
</style>