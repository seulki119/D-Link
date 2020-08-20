<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="600">
      <div v-show="!selected">
        <v-toolbar>
          <v-toolbar-title>당신의 선택은?</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-radio-group v-model="choice" mandatory>
            <v-layout row class="align-end">
              <v-flex column xs12 sm6 md6 lg6 x6>
                <v-img :src="`//i3b307.p.ssafy.io/${image[0]}`" class="ma-3"></v-img>
                <v-radio value="0"></v-radio>
              </v-flex>
              <v-flex column xs12 sm6 md6 lg6 x6>
                <v-img :src="`//i3b307.p.ssafy.io/${image[1]}`" class="ma-3"></v-img>
                <v-radio value="1"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-row>
        <v-divider></v-divider>
        <v-btn block @click="vote()">{{topic[choice]}}에 투표하기</v-btn>
      </div>
      <div v-show="selected">
        <v-toolbar>
          <v-toolbar-title>당신의 선택은 {{topic[last]}}였습니다.</v-toolbar-title>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <v-layout row class="align-end">
            <v-flex column xs12 sm6 md6 lg6 x6>
              <v-img :src="`//i3b307.p.ssafy.io/${image[last]}`" class="ma-3"></v-img>
            </v-flex>
            <v-flex column xs12 sm6 md6 lg6 x6>
              <div class="align-center">
                <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
              </div>
            </v-flex>
          </v-layout>
        </v-row>
        <v-toolbar>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{topic[0]}} vs {{topic[1]}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row class="justify-center mx-auto">
          <section class="chat-area" id="chat-area" v-auto-scroll-bottom>
            <div
              v-for="(item, index) in messages"
              :key="index"
              class="message"
              :class="{ 'message-out': item.username === userName, 'message-in': item.username !== userName }"
            >
              <v-row class="d-block">
                <!-- <v-avatar>
                  <v-img
                    v-if="item.profileImage != null"
                    :src="`//i3b307.p.ssafy.io/${item.profileImage}`"
                    alt
                  />
                </v-avatar>-->
                <v-col cols="auto" class="pl-6">
                  <p class="font-weight-bold mb-0 text-subtitle-1">
                    <v-avatar
                      :class="{'first':item.choice===0,'second':item.choice===1}"
                      size="10"
                    />
                    {{item.username}}
                  </p>
                  <p class="real pa-3 mb-0">{{item.message}}</p>
                </v-col>
              </v-row>
            </div>
          </section>
          <v-text-field v-model="mymessage" label="메시지" @keyup.enter="sendChatMessage()"></v-text-field>
          <v-btn class="ma-2" :disabled="canSend" @click="sendChatMessage()">전송</v-btn>
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
      // roomId: this.$route.params.id,
      no: this.$route.params.no,

      canSend: false,
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
            colors: ["white"]
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
        },
        colors: ["#99c788", "#178f04"]
      }
    };
  },
  computed: {
    ...mapGetters(["messages"]),
    ...mapGetters(["userName"]),
    ...mapGetters(["profileImage"])
  },
  created() {
    this.$store.dispatch("getMessages");

    let token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    http
      .get("versus", config)
      .then(res => {
        let data = res.data[this.no];
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

    // let room = this.roomId;
    // this.$store.dispatch("socketConnect", {
    //   token: token,
    //   room: room,
    //   type: 1
    // });
    // this.$store.dispatch("getMessages", room);
  },
  methods: {
    vote() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      let data = new FormData();
      data.append("select", this.choice == 0 ? "A" : "B");
      http.post(`/versus/${this.id}/vote/`, data, config).then(res => {
        this.last = this.choice;
        this.selected = true;
        this.series.length = 0;
        this.series.push(res.data.select_A.length);
        this.series.push(res.data.select_B.length);
        console.log(res);
      });
    },
    sendChatMessage() {
      let trimed = this.mymessage.trim();
      if (trimed != "") {
        let socket = this.$store.state.chatSocket;
        let data = {
          message: trimed,
          username: this.$store.getters.userName,
          profileImage: this.$store.getters.profileImage,
          choice: this.last
        };
        socket.send(JSON.stringify(data));
        this.mymessage = "";
      }
    }
  },
  watch: {
    mymessage() {
      this.canSend = this.mymessage.trim() != "" ? false : true;
    }
  },
  beforeCreate() {
    let room = this.$store.state.roomId;
    let token = localStorage.getItem("token");
    this.$store.dispatch("socketConnect", {
      token: token,
      room: room,
      type: 1
    });
  }
};
</script>

<style scoped>
.v-radio {
  text-align: center;
  display: block;
}
.chat-area {
  /* background: white; */
  height: 50vh;
  padding: 1em 1em;
  /* margin: 1em; */
  overflow-y: scroll;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  width: 45%;
  /* border-radius: 10px; */
  padding: 0.5em;
  /* margin-bottom: 0.5em; */
  font-size: 0.8em;
}
.message-out {
  /* background: #407fff; */
  color: black;
  margin-left: 50%;

  /* padding: 0; */
}
.message-out .real {
  background: #407fff;
  color: white;
  border-radius: 10px;
  /* margin-left: 50%; */
}

.message-in .real {
  background: #f1f0f0;
  color: black;
  border-radius: 10px;
}
.first {
  background: #f5b041;
}
.second {
  background: #3498db;
}
.pl-6 {
  padding: 0px 0px 0px 6px !important;
}
</style>