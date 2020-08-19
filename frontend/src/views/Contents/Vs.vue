<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="600">
      <div v-show="!selected">
        <v-toolbar dark flat>
          <v-toolbar-title>당신의 선택은?</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-radio-group v-model="choice" mandatory>
            <v-layout row class="align-end">
              <v-flex column xs12 sm6 md6 lg6 x6>
                <v-img :src="`//i3b307.p.ssafy.io/${image[0]}`" class="grey lighten-2 ma-3"></v-img>
                <v-radio value="0"></v-radio>
              </v-flex>
              <v-flex column xs12 sm6 md6 lg6 x6>
                <v-img :src="`//i3b307.p.ssafy.io/${image[1]}`" class="grey lighten-2 ma-3"></v-img>
                <v-radio value="1"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-row>
        <v-divider></v-divider>
        <v-btn block color="indigo lighten-1 white--text" @click="vote()">{{topic[choice]}}에 투표하기</v-btn>
      </div>
      <div v-show="selected">
        <v-toolbar dark flat>
          <v-toolbar-title>당신의 선택은 {{topic[last]}}였습니다.</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-layout row class="align-end">
            <v-flex column xs12 sm6 md6 lg6 x6>
              <v-img :src="`//i3b307.p.ssafy.io/${image[last]}`" class="grey lighten-2 ma-3"></v-img>
            </v-flex>
            <v-flex column xs12 sm6 md6 lg6 x6>
              <div class="align-center">
                <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
              </div>
            </v-flex>
          </v-layout>
        </v-row>
        <v-toolbar dark flat>
          <v-toolbar-title>{{topic[0]}} vs {{topic[1]}}</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <section class="chat-area" id="chat-area" v-auto-scroll-bottom>
            <p
              v-for="(item, index) in messages"
              :key="index"
              class="message"
              :class="{ 'message-out': item.username === userName, 'message-in': item.username !== userName }"
            >{{item.username + ": " + item.message}}</p>
          </section>
          <!-- <textarea id="chat-log" cols="100" rows="20" disabled v-auto-scroll-bottom></textarea> -->
          <v-text-field v-model="mymessage" label="메시지" @keyup.enter="sendChatMessage()"></v-text-field>
          <v-btn color="blue-grey" class="ma-2 white--text" @click="sendChatMessage()">전송</v-btn>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";
export default {
  data() {
    return {
      mymessage: "",
      id: [],
      image: [],
      topic: [],
      createdAt: "",
      select_A: [],
      select_B: [],
      choice: "",
      selected: false,
      last: "",
      series: [],
      chartOptions: {
        dataLabels: {
          enabled: true,
          formatter: function(v, { seriesIndex, w }) {
            return w.config.labels[seriesIndex] + " : " + Math.round(v) + "%";
          },
          style: {
            colors: ["dark", "dark"]
          }
        },
        chart: {
          type: "donut"
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
                total: {
                  showAlways: true,
                  show: true,
                  label: "총 투표수"
                }
              }
            },
            name: {
              show: true
            }
          }
        },
        labels: [],
        legend: {
          show: false
        }
      }
    };
  },
  computed: {
    ...mapGetters(["messages"]),
    ...mapGetters(["userName"])
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
        this.chartOptions.labels.push(data.topic_A);
        this.chartOptions.labels.push(data.topic_B);
        this.series.push(data.select_A.length);
        this.series.push(data.select_B.length);
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
    scrolled() {},
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
      let data = {
        message: this.mymessage,
        username: this.$store.getters.userName
      };
      if (data.message != "") {
        socket.send(JSON.stringify(data));
        this.mymessage = "";
      }
    }
  },

  beforeCreate() {
    let room = "1";
    let token = localStorage.getItem("token");
    this.$store.dispatch("socketConnect", {
      token: token,
      room: room,
      type: 1
    });
    this.$store.dispatch("getMessages");
  }
};
</script>

<style>
.v-radio {
  text-align: center;
  display: block;
}
.chat-area {
  background: white;
  height: 50vh;
  padding: 1em 1em;
  margin: 1em;
  overflow-y: scroll;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
</style>