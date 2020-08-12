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
      import(/* webpackChunkName: "login" */ "./views/accounts/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "signup" */ "./views/accounts/Signup.vue"),
  },
  {
    path: "/taste",
    name: "taste",
    // beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "taste" */ "./views/accounts/Taste.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "./views/accounts/Mypage.vue"),
  },
  {
    path: "/updateuser",
    name: "updateuser",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "./views/accounts/Update.vue"),
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
      import(
        /* webpackChunkName: "createArticle" */ "./views/Articles/CreateArticle.vue"
      ),
  },
  {
    path: "/notifications",
    name: "notifications",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "notifications" */ "./views/accounts/Notifications.vue"
      ),
  },
  // {
  //   path: "/passwordChange",
  //   name: "passwordChange",
  //   beforeEnter: onlyAuthUser,
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "passwordChange" */ "./views/accounts/PasswordChange.vue"
  //     ),
  // },
  {
    path: "/search",
    name: "search",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "search" */ "./views/Articles/Search.vue"
      ),
  },
  {
    path: "/contentlist",
    name: "contentlist",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "search" */ "./views/Contents/ContentList.vue"
      ),
  },
  {
    path: "/cocktail",
    name: "cocktail",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "search" */ "./views/Contents/Cocktail.vue"
      ),
  },
  {
    path: "/vs",
    name: "vs",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "search" */ "./views/Contents/Vs.vue"
      ),
  },
  {
    path: "/videochat",
    name: "videochat",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(
        /* webpackChunkName: "search" */ "./views/Contents/VideoChat.vue"
      ),
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
