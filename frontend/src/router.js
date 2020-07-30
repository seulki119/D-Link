/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const rejectAuthUser = (to, from, next) => {
  //이미 로그인 된 유저는 몇몇 페이지 차단
  if (store.state.isLogin === true) {
    alert("이미 로그인을 하였습니다.");
    next("/");
  } else {
    next();
  }
};
const onlyAuthUser = (to, from, next) => {
  //로그인 된 유저만 접속 가능
  if (store.state.isLogin === true || localStorage.getItem("token") !== null) {
    next();
  } else {
    alert("로그인을 해야합니다.");
    next("/");
  }
};
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "login" */ "./views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "signup" */ "./views/Signup.vue"),
  },
  {
    path: "/taste",
    name: "taste",
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "taste" */ "./views/Taste.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "./views/Mypage.vue"),
  },
  {
    path: "/articlelist",
    name: "articlelist",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "articlelist" */ "./views/Articles/ArticleList.vue"
      ),
  },
  {
    path: "/article",
    name: "article",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "article" */ "./views/Articles/Article.vue"),
  },
  {
    path: "/createArticle",
    name: "createArticle",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "./views/CreateArticle.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
