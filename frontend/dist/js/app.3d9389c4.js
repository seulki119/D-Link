(function(e){function t(t){for(var r,i,o=t[0],l=t[1],s=t[2],u=0,g=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&g.push(n[i][0]),n[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);p&&p(t);while(g.length)g.shift()();return c.push.apply(c,s||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],r=!0,i=1;i<a.length;i++){var o=a[i];0!==n[o]&&(r=!1)}r&&(c.splice(t--,1),e=l(l.s=a[0]))}return e}var r={},i={app:0},n={app:0},c=[];function o(e){return l.p+"js/"+({"article~articlelist~createArticle~home~login~mypage~search~signup~taste":"article~articlelist~createArticle~home~login~mypage~search~signup~taste",articlelist:"articlelist","article~createArticle~login~mypage~search~signup":"article~createArticle~login~mypage~search~signup","article~createArticle~mypage~notifications~search":"article~createArticle~mypage~notifications~search","article~createArticle~search":"article~createArticle~search",article:"article",createArticle:"createArticle",search:"search",mypage:"mypage",login:"login",signup:"signup",home:"home",taste:"taste",notifications:"notifications"}[e]||e)+"."+{"article~articlelist~createArticle~home~login~mypage~search~signup~taste":"77559a68",articlelist:"359be8fa","article~createArticle~login~mypage~search~signup":"3bcc77a1","article~createArticle~mypage~notifications~search":"e467bcd6","article~createArticle~search":"4fc70b1c",article:"706f00b0",createArticle:"714363cd",search:"99743218",mypage:"9a8c5d5c",login:"9b2da9ff",signup:"709c7dd0",home:"f5440b8e",taste:"92e87eda",notifications:"27c3ba5f"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(e){var t=[],a={"article~articlelist~createArticle~home~login~mypage~search~signup~taste":1,articlelist:1,"article~createArticle~login~mypage~search~signup":1,"article~createArticle~mypage~notifications~search":1,"article~createArticle~search":1,article:1,createArticle:1,search:1,mypage:1,login:1,signup:1,home:1,taste:1,notifications:1};i[e]?t.push(i[e]):0!==i[e]&&a[e]&&t.push(i[e]=new Promise((function(t,a){for(var r="css/"+({"article~articlelist~createArticle~home~login~mypage~search~signup~taste":"article~articlelist~createArticle~home~login~mypage~search~signup~taste",articlelist:"articlelist","article~createArticle~login~mypage~search~signup":"article~createArticle~login~mypage~search~signup","article~createArticle~mypage~notifications~search":"article~createArticle~mypage~notifications~search","article~createArticle~search":"article~createArticle~search",article:"article",createArticle:"createArticle",search:"search",mypage:"mypage",login:"login",signup:"signup",home:"home",taste:"taste",notifications:"notifications"}[e]||e)+"."+{"article~articlelist~createArticle~home~login~mypage~search~signup~taste":"17f4035a",articlelist:"a329e865","article~createArticle~login~mypage~search~signup":"7638bb48","article~createArticle~mypage~notifications~search":"c9184e05","article~createArticle~search":"cd68f5c1",article:"e102ac0f",createArticle:"81d9a32c",search:"85e964b6",mypage:"06bca4aa",login:"178652d0",signup:"761941c0",home:"3699aaba",taste:"3699aaba",notifications:"96db1a85"}[e]+".css",n=l.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var s=c[o],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===r||u===n))return t()}var g=document.getElementsByTagName("style");for(o=0;o<g.length;o++){s=g[o],u=s.getAttribute("data-href");if(u===r||u===n)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||n,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete i[e],p.parentNode.removeChild(p),a(c)},p.href=n;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){i[e]=0})));var r=n[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,a){r=n[e]=[t,a]}));t.push(r[2]=c);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=o(e);var g=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(p);var a=n[e];if(0!==a){if(a){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;g.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",g.name="ChunkLoadError",g.type=r,g.request=i,a[1](g)}n[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(a,r,function(t){return e[t]}.bind(null,r));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var g=0;g<s.length;g++)t(s[g]);var p=u;c.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},1:function(e,t){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"inspire"}},[!e.isSearch&&e.isLogin?a("v-app-bar",{staticClass:"mx-auto",attrs:{app:"",color:"indigo",dark:"","max-width":"600","min-width":"300","elevate-on-scroll":""}},[e.canBack?a("v-btn",{staticClass:"mx-auto",attrs:{icon:""},on:{click:function(t){return e.$router.go(-1)}}},[a("v-icon",[e._v("mdi-history")])],1):a("v-btn",{staticClass:"mx-auto",attrs:{icon:"",disabled:""}},[a("v-icon",[e._v("mdi-history")])],1),a("div",{staticClass:"mx-auto",attrs:{icon:""}},[a("v-icon",[e._v("D L I N K")])],1),a("v-btn",{staticClass:"mx-auto",attrs:{icon:"",router:"",to:{name:"notifications"}}},[a("v-badge",{attrs:{color:"red",left:"",overlap:""}},[a("span",{attrs:{slot:"badge"},slot:"badge"},[e._v("3")]),a("v-icon",[e._v("mdi-mail")])],1)],1)],1):e._e(),a("v-main",[a("router-view")],1),a("v-footer",{staticClass:"pa-0",staticStyle:{"background-color":"transparent"},attrs:{app:""}},[e.isLogin?a("v-bottom-navigation",{staticClass:"mx-auto",attrs:{grow:"",color:"teal",dark:"","max-width":"600","min-width":"300"}},[a("v-btn",{attrs:{icon:"",router:"",to:{name:"articlelist"}}},[e._v(" 홈 "),a("v-icon",[e._v("mdi-home")])],1),a("v-btn",{attrs:{icon:"",router:"",to:{name:"search"}}},[e._v(" 검색 "),a("v-icon",[e._v("mdi-magnify")])],1),a("v-btn",{attrs:{"prepend-icon":"mdi-plus",icon:"",router:"",to:{name:"createArticle"}}},[e._v(" 업로드 "),a("v-icon",[e._v("mdi-plus")])],1),a("v-btn",{attrs:{icon:""}},[e._v(" 컨텐츠 "),a("v-icon",[e._v("mdi-dialpad")])],1),a("v-btn",{attrs:{icon:"",router:"",to:{name:"mypage"}}},[e._v(" 마이페이지 "),a("v-icon",[e._v("mdi-account")])],1)],1):e._e()],1)],1)},n=[],c=(a("b0c0"),a("5530")),o=a("2f62"),l={props:{source:String},data:function(){return{drawer:null,canBack:!0,isSearch:!1}},computed:Object(c["a"])({},Object(o["d"])(["isLogin"])),beforeUpdate:function(){this.canBack=!0;var e=this.$router.history.current.name,t=this.$router.options.routes;if(console.log(this.$router.history.current.name),"search"===this.$router.history.current.name)this.isSearch=!0;else{this.isSearch=!1;for(var a=0;a<6;a++)if(t[a].name===e)return void(this.canBack=!1)}}},s=l,u=a("2877"),g=a("6544"),p=a.n(g),m=a("7496"),h=a("40dc"),f=a("4ca6"),d=a("b81c"),v=a("8336"),y=a("553a"),b=a("132d"),A=a("f6c4"),k=Object(u["a"])(s,i,n,!1,null,null,null),_=k.exports;p()(k,{VApp:m["a"],VAppBar:h["a"],VBadge:f["a"],VBottomNavigation:d["a"],VBtn:v["a"],VFooter:y["a"],VIcon:b["a"],VMain:A["a"]});a("d3b7");var w=a("8c4f"),S=a("c21c");r["a"].use(o["a"]);var I=new o["a"].Store({state:{userInfo:null,isLogin:!1,isLoginError:!1,items:[],item:{}},getters:{userId:function(e){return e.userInfo.pk},userName:function(e){return e.userInfo.username},items:function(e){return e.items},item:function(e){return e.item}},mutations:{loginSuccess:function(e,t){e.isLogin=!0,e.isLoginError=!1,e.userInfo=t},loginError:function(e){e.isLogin=!1,e.isLoginError=!0},logout:function(e){e.isLogin=!1,e.isLoginError=!1,e.userInfo=null,localStorage.removeItem("token")},setItems:function(e,t){e.items=t},setItem:function(e,t){e.item=t}},actions:{login:function(e,t){var a=this;e.dispatch;S["a"].post("/rest-auth/login/",t).then((function(e){var t=e.data.key;localStorage.setItem("token",t),a.dispatch("getUserInfo")})).catch((function(e){console.log(e),alert("이메일과 비밀번호를 확인하세요.")}))},logout:function(e){var t=e.commit;t("logout"),C.push({name:"home"}).catch((function(e){if("NavigationDuplicated"!=e.name)throw e}))},getUserInfo:function(e){var t=e.commit,a=localStorage.getItem("token"),r={headers:{Authorization:"Token ".concat(a)}},i="";S["a"].post("/accounts/user/",i,r).then((function(e){console.log(e);var a={pk:e.data.id,username:e.data.username,email:e.data.email,first_name:e.data.first_name,last_name:e.data.last_name,taste1:e.data.taste1,taste2:e.data.taste2};t("loginSuccess",a),null===a.taste1||null===a.taste2?(alert("주류 취향을 선택하고 d-link를 이용해주세요!"),C.push({name:"taste",params:{username:a.username}})):C.push("articlelist")})).catch((function(e){console.log(e)}))},getArticles:function(e,t){var a=localStorage.getItem("token"),r={headers:{Authorization:"Token ".concat(a)}};S["a"].get(t,r).then((function(t){e.commit("setItems",t.data)})).catch((function(){alert("에러가 발생했습니다.")}))},getArticle:function(e,t){var a=localStorage.getItem("token"),r={headers:{Authorization:"Token ".concat(a)}};S["a"].get(t,r).then((function(t){console.log(t),e.commit("setItem",t.data)})).catch((function(){alert("에러가 발생했습니다.")}))},doScrap:function(e,t){var a=this,r=localStorage.getItem("token"),i={headers:{Authorization:"Token ".concat(r)}};S["a"].get(t.url,i).then((function(e){console.log(e),console.log(t.url),"articlelist"==t.page?a.dispatch("getArticles","/articles"):"article"==t.page&&a.dispatch("getArticle","/articles/".concat(t.id))})).catch((function(e){console.log(e),alert("에러가 발생했습니다.")}))},googleLogin:function(e,t){var a=this;S["a"].post("/accounts/google/",{code:t,redirect_uri:"postmessage"}).then((function(e){console.log(e);var t=e.data.key;localStorage.setItem("token",t),a.dispatch("getUserInfo")})).catch((function(e){console.log(e)}))},kakaoLogin:function(e,t){S["a"].post("/accounts/kakao/",{token:t,redirect_uri:"http://127.0.0.1:8000/accounts/kakao/callback/"}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}}});r["a"].use(w["a"]);var E=function(e,t,a){!0===I.state.isLogin?(alert("이미 로그인을 하였습니다."),a("/")):a()},L=function(e,t,a){!0===I.state.isLogin||null!==localStorage.getItem("token")?a():(alert("로그인을 해야합니다."),a("/"))},P=[{path:"/",name:"home",component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("home")]).then(a.bind(null,"bb51"))}},{path:"/login",name:"login",beforeEnter:E,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("login")]).then(a.bind(null,"3d00"))}},{path:"/signup",name:"signup",beforeEnter:E,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("signup")]).then(a.bind(null,"f1df"))}},{path:"/taste",name:"taste",component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("taste")]).then(a.bind(null,"e302"))}},{path:"/mypage",name:"mypage",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("article~createArticle~mypage~notifications~search"),a.e("mypage")]).then(a.bind(null,"2730"))}},{path:"/updateuser",name:"updateuser",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("article~createArticle~mypage~notifications~search"),a.e("mypage")]).then(a.bind(null,"f0bc"))}},{path:"/articlelist",name:"articlelist",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("articlelist")]).then(a.bind(null,"7467"))}},{path:"/article",name:"article",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("article~createArticle~mypage~notifications~search"),a.e("article~createArticle~search"),a.e("article")]).then(a.bind(null,"3e5b"))}},{path:"/createArticle",name:"createArticle",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("article~createArticle~mypage~notifications~search"),a.e("article~createArticle~search"),a.e("createArticle")]).then(a.bind(null,"1c7a"))}},{path:"/notifications",name:"notifications",beforeEnter:L,component:function(){return Promise.all([a.e("article~createArticle~mypage~notifications~search"),a.e("notifications")]).then(a.bind(null,"08f3"))}},{path:"/search",name:"search",beforeEnter:L,component:function(){return Promise.all([a.e("article~articlelist~createArticle~home~login~mypage~search~signup~taste"),a.e("article~createArticle~login~mypage~search~signup"),a.e("article~createArticle~mypage~notifications~search"),a.e("article~createArticle~search"),a.e("search")]).then(a.bind(null,"f5c9"))}}],x=new w["a"]({mode:"history",base:"/",routes:P}),C=x,j=a("f309");r["a"].use(j["a"]);var O=new j["a"]({}),T=a("c9bf"),B=a("28dd");r["a"].config.productionTip=!1,r["a"].use(T["a"],{clientId:"122178100323-91dhrvqu6bm14umnnovogcud8upb4c71.apps.googleusercontent.com",scope:"profile email"}),r["a"].use(B["a"]),new r["a"]({router:C,store:I,vuetify:O,beforeCreate:function(){I.dispatch("getUserInfo")},render:function(e){return e(_)}}).$mount("#app")},c21c:function(e,t,a){"use strict";var r=a("bc3a"),i=a.n(r);t["a"]=i.a.create({baseURL:"http://127.0.0.1:8000",headers:{"Content-type":"application/json"}})}});
//# sourceMappingURL=app.3d9389c4.js.map