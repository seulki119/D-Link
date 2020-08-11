import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://i3b307.p.ssafy.io/api",
  // http://i3b307.p.ssafy.io/
  // http://127.0.0.1:8000/
  headers: {
    "Content-type": "application/json",
  },
});
