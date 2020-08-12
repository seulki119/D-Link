import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://i3b307.p.ssafy.io/api",
  // https://i3b307.p.ssafy.io/api
  // https://127.0.0.1:8000/api
  headers: {
    "Content-type": "application/json",
  },
});
