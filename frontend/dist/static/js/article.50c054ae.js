(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["article"],{"0c6d":function(t,e,a){"use strict";var n=a("260c"),o=a.n(n);o.a},"260c":function(t,e,a){},"2fa4":function(t,e,a){"use strict";a("20f6");var n=a("80d2");e["a"]=Object(n["g"])("spacer","div","v-spacer")},"3e5b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.loading?a("div",{staticClass:"overlay"},[t._v("로딩중")]):a("div",[a("v-card",{staticClass:"mx-auto pa-5",attrs:{"max-width":"600"}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{color:"grey"}},[null!=t.item.user.image?a("v-img",{attrs:{src:"//i3b307.p.ssafy.io/"+t.item.user.image}}):t._e()],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.item.user.username))])],1),t.item.user.id==t.userId?a("v-menu",{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[a("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",o,!1),n),[a("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!1,3221905750)},[a("v-list",t._l(t.articleMenu,(function(e,n){return a("v-list-item",{key:n,on:{click:function(a){return t.clickMenu(e)}}},[a("v-list-item-title",[t._v(t._s(e))])],1)})),1)],1):t._e()],1),a("v-img",{staticClass:"max-small",attrs:{src:"//i3b307.p.ssafy.io/"+t.item.image}}),t.modeUpdate?a("div",[a("v-card-text",{staticClass:"text--primary"},[a("v-textarea",{attrs:{label:"내용",counter:"",maxlength:"120","full-width":"","single-line":""},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),a("v-divider"),a("v-card-text",[a("v-combobox",{staticClass:"pt-6",attrs:{items:t.items,label:"태그 입력하세요",maxlength:t.max,multiple:"",chips:"",dense:""},on:{keypress:t.isNotSpecial},model:{value:t.hashtags,callback:function(e){t.hashtags=e},expression:"hashtags"}})],1),a("v-divider"),a("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:function(e){t.modeUpdate=!t.modeUpdate,t.content=t.item.content}}},[a("v-icon",{attrs:{left:"",dark:""}},[t._v("mdi-arrow-left")]),t._v("back ")],1),a("v-btn",{staticClass:"ma-2 white--text",staticStyle:{float:"right"},attrs:{color:"blue-grey"},on:{click:function(e){return t.actUpdate()}}},[t._v(" upload "),a("v-icon",{attrs:{right:"",dark:""}},[t._v("mdi-cloud-upload")])],1)],1):a("div",[a("v-card-text",[a("div",{staticClass:"scrapInfo"},[t._v(" "+t._s(t.item.scrap.length)+" "),t.item.scrap.includes(t.userId)?a("img",{staticClass:"scrapInfo",attrs:{src:t.scrapSrc=t.scrapYes},on:{click:function(e){return t.scrapAct(t.item.id)}}}):a("img",{staticClass:"scrapInfo",attrs:{src:t.scrapSrc=t.scrapNo},on:{click:function(e){return t.scrapAct(t.item.id,t.item.user.id,t.item.image)}}})])]),a("v-card-text",{staticStyle:{color:"black"}},[t.readMoreActivated?t._e():a("span",[t._v(t._s(t.item.content.slice(0,45)))]),t.item.content.length>45&&!t.readMoreActivated?a("a",{staticStyle:{color:"gray"},on:{click:t.activateReadMore}},[t._v("...더보기")]):t._e(),t.readMoreActivated?a("span",{domProps:{innerHTML:t._s(t.item.content)}}):t._e()]),a("v-card-text",[a("v-combobox",{staticClass:"pt-6",attrs:{multiple:"",chips:"",disabled:""},model:{value:t.hashtags,callback:function(e){t.hashtags=e},expression:"hashtags"}})],1),a("v-card-actions",[t.item.commentSet.length>0?a("v-btn",{attrs:{text:"",color:"deep-purple accent-4"},nativeOn:{click:function(e){t.show=!t.show}}},[t._v(" "+t._s(t.show?"댓글 접기":"댓글 "+t.item.commentSet.length+"개 모두 보기")+" ")]):t._e(),a("v-spacer")],1),t.item.commentSet.length>0&&null!=t.repComment?a("v-slide-y-transition",[a("v-card-text",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}]},[a("v-list-item",[a("v-list-item-avatar",{attrs:{color:"grey"}},[null!=t.repComment.userImage?a("v-img",{attrs:{src:"//i3b307.p.ssafy.io/"+t.repComment.userImage}}):t._e()],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.repComment.userName))]),a("v-list-item-subtitle",[t._v(" "+t._s(t.repComment.content)+" ")])],1)],1)],1)],1):t._e(),void 0!==t.item.commentSet&&t.item.commentSet.length>0?a("v-slide-y-transition",[a("v-card-text",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},t._l(t.item.commentSet,(function(e,n){return a("v-list-group",{key:n,scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-list-item-avatar",{attrs:{color:"grey"}},[null!=e.user.image?a("v-img",{attrs:{src:"//i3b307.p.ssafy.io/"+e.user.image}}):t._e()],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.user.username))]),t._v(" "+t._s(e.content)+" ")],1)]},proxy:!0}],null,!0)},[a("v-list-item",[a("v-list-item-content",[a("div",[a("span",{staticClass:"grey--text text--lighten-1 commentMenu",on:{click:function(a){t.myComment="@"+e.user.username+" ",t.modeComment=!1,t.comm={id:e.id,username:e.user.username,userid:e.user.id}}}},[t._v("답글달기")]),a("span",{directives:[{name:"show",rawName:"v-show",value:t.item.user.id==t.userId||e.user.id==t.userId,expression:"item.user.id == userId || comment.user.id == userId"}],staticClass:"grey--text text--lighten-1 commentMenu",on:{click:function(a){return t.deleteComment(e.id)}}},[t._v("삭제")])])])],1),void 0!==e.recommentSet?a("div",[a("comment-form",{attrs:{comments:e.recommentSet,itemUserId:t.item.user.id,userId:t.userId,commentId:e.id}})],1):t._e()],1)})),1)],1):t._e(),a("v-card-actions",[a("v-textarea",{attrs:{"auto-grow":"",outlined:"",filled:"",rows:"1","row-height":"15",placeholder:t.userName+" 님의 댓글",modeComment:t.modeComment,"append-icon":"mdi-comment",maxlength:"80",counter:"80"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.modeComment?t.createComment():t.createRecomment()}},model:{value:t.myComment,callback:function(e){t.myComment=e},expression:"myComment"}})],1)],1)],1)],1)},o=[],s=(a("99af"),a("d3b7"),a("5530")),i=a("2f62"),c=a("c21c"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[void 0!==t.comments&&t.comments.length>0?a("v-slide-y-transition",[a("v-card-text",t._l(t.comments,(function(e,n){return a("v-list-item",{key:n},[null!=e.content&&" "!=e.content?a("v-list-item-avatar",{attrs:{color:"grey"}},[null!=e.user.image?a("v-img",{attrs:{src:"//i3b307.p.ssafy.io/"+e.user.image}}):t._e()],1):t._e(),null!=e.content&&" "!=e.content?a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.user.username))]),t._v(" "+t._s(e.content)+" ")],1):t._e(),a("span",{directives:[{name:"show",rawName:"v-show",value:t.itemUserId==t.userId||e.user.id==t.userId,expression:"itemUserId == userId || comment.user.id == userId"}],staticClass:"grey--text text--lighten-1 commentMenu",on:{click:function(a){return t.deleteComment(e.id)}}},[t._v("삭제")])],1)})),1)],1):t._e()],1)},m=[],l=(a("a434"),a("a9e3"),{props:{comments:{type:Array,default:function(){return{}}},itemUserId:Number,userId:Number,commentId:Number},data:function(){return{show:!1,comm:{id:"",username:"",index:""}}},created:function(){},beforeUpdate:function(){},methods:{deleteComment:function(t,e){var a=this,n=localStorage.getItem("token"),o={headers:{Authorization:"Token ".concat(n)}};c["a"].delete("/articles/comment/".concat(this.commentId,"/recomment/").concat(t,"/"),o).then((function(t){console.log(t),a.snackbar=!1,a.comments.splice(e,1)})).catch((function(t){console.log(t.response)}))}}}),d=l,u=(a("e2b2"),a("2877")),h=a("6544"),v=a.n(h),p=a("99d9"),g=a("adda"),f=a("da13"),C=a("8270"),y=a("5d23"),b=a("0789"),I=Object(u["a"])(d,r,m,!1,null,null,null),_=I.exports;v()(I,{VCardText:p["b"],VImg:g["a"],VListItem:f["a"],VListItemAvatar:C["a"],VListItemContent:y["a"],VListItemTitle:y["c"],VSlideYTransition:b["e"]});var k={components:{CommentForm:_},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(i["c"])(["item"])),Object(i["c"])(["userId"])),Object(i["c"])(["userName"])),data:function(){return{loading:!1,scrapSrc:"",scrapNo:"https://img.icons8.com/carbon-copy/24/000000/wine-glass.png",scrapYes:"https://img.icons8.com/plasticine/24/000000/wine-glass.png",readMoreActivated:!1,show:!1,repComment:{id:"",userName:"",content:"",userImage:""},myComment:"",hashtags:[],articleMenu:["수정","삭제"],socket:null,comm:{id:"",username:""},modeComment:!0,modeUpdate:!1,content:"",items:[],max:20,comments:[]}},watch:{myComment:function(){""==this.myComment&&(this.modeComment=!0)}},created:function(){var t=this;this.loading=!0,this.$store.dispatch("getArticle","/articles/".concat(this.$route.query.id)).then((function(e){console.log(e),void 0===e&&t.$store.dispatch("getArticle","/articles/".concat(t.$route.query.id))})).finally((function(){setTimeout((function(){var e=t.item.commentSet;if(void 0!==e)for(var a=e.length-1;a>=0;a--)if(a==e.length-1&&(t.repComment.id=e[a].id,t.repComment.userName=e[a].user.username,t.repComment.content=e[a].content,t.repComment.userImage=e[a].user.image),e[a].user.id===t.userId){t.repComment.id=e[a].id,t.repComment.userName=e[a].user.username,t.repComment.content=e[a].content,t.repComment.userImage=e[a].user.image;break}t.comments=e,t.content=t.item.content;for(var n=t.item.hashtag,o=[],s=0;s<n.length;s++)o.push(n[s].tag);t.hashtags=o,t.loading=!1}),400)}))},methods:{scrapAct:function(t,e,a){this.$store.dispatch("doScrap",{url:"/articles/".concat(t,"/scrap"),page:"article",id:"".concat(t)}),e&&this.$store.dispatch("sendAlarm",{url:"/alarms/Share/",articleUserId:"".concat(e),articleId:"".concat(t),thumbnailPath:"".concat(a),message:"",alarmType:0})},activateReadMore:function(){this.readMoreActivated=!0},createComment:function(){var t=this;this.$store.dispatch("sendAlarm",{url:"/alarms/Share/",articleUserId:"".concat(this.item.user.id),articleId:"".concat(this.item.id),thumbnailPath:"".concat(this.item.image),message:this.myComment,alarmType:1});var e=localStorage.getItem("token"),a={headers:{Authorization:"Token ".concat(e)}},n=new FormData;n.append("user",this.userId),n.append("content",this.myComment),c["a"].post("/articles/".concat(this.item.id,"/comment/"),n,a).then((function(e){console.log(e),t.$store.dispatch("getArticle","/articles/".concat(t.$route.query.id)),null===t.repComment&&(t.repComment.userName=t.userId,t.repComment.content=t.myComment,t.repComment.userImage=t.userImage),console.log("THIS.REPCOMM : "+t.repComment),t.myComment=""})).catch((function(t){console.log(t)}))},deleteComment:function(t){var e=this;console.log(t);var a=localStorage.getItem("token"),n={headers:{Authorization:"Token ".concat(a)}};c["a"].delete("/articles/".concat(this.item.id,"/comment/").concat(t,"/"),n).then((function(){e.$store.dispatch("getArticle","/articles/".concat(e.$route.query.id)),e.repComment.id==t&&(e.repComment=null)})).catch((function(t){console.log(t.response)}))},clickMenu:function(t){var e=this,a=localStorage.getItem("token"),n={headers:{Authorization:"Token ".concat(a)}};"삭제"===t?c["a"].delete("/articles/".concat(this.item.id),n).then((function(t){alert(t.data.message),e.$router.push("mypage")})).catch((function(t){alert(t.data.message)})):(this.modeUpdate=!0,c["a"].post("/articles/hashtag/","",n).then((function(t){var a=[];for(var n in t.data)a.push(t.data[n].tag);e.items=a})))},actUpdate:function(){var t=this,e=localStorage.getItem("token"),a={headers:{Authorization:"Token ".concat(e)}},n=[];for(var o in this.hashtags)n+="#",n+=this.hashtags[o];var s=new FormData;s.append("content",this.content),s.append("hashtags",n),c["a"].put("/articles/".concat(this.item.id,"/"),s,a).then((function(e){console.log(e),t.modeUpdate=!t.modeUpdate})).catch((function(t){console.log(t.response)}))},isNotSpecial:function(t){var e=t.keyCode?t.keyCode:t.which;(e>=123&&e<=130||e>=32&&e<=47||e>=58&&e<=64||e>=91&&e<=96)&&t.preventDefault()},createRecomment:function(){var t=this;this.$store.dispatch("sendAlarm",{url:"/alarms/Share/",articleUserId:"".concat(this.comm.userid),articleId:"".concat(this.item.id),thumbnailPath:"".concat(this.item.image),message:this.myComment,alarmType:2});var e=localStorage.getItem("token"),a={headers:{Authorization:"Token ".concat(e)}},n=new FormData;n.append("user",this.userId),n.append("content",this.myComment),c["a"].post("/articles/comment/".concat(this.comm.id,"/recomment/"),n,a).then((function(e){console.log(e),t.$store.dispatch("getArticle","/articles/".concat(t.$route.query.id)),t.myComment=""})).catch((function(t){console.log(t.data)}))},reply:function(){alert("!")}}},x=k,w=(a("0c6d"),a("8336")),S=a("b0af"),A=a("2b5d"),V=a("ce7e"),T=a("132d"),M=a("8860"),N=a("56b0"),U=a("e449"),$=a("2fa4"),L=a("a844"),O=Object(u["a"])(x,n,o,!1,null,"43f7e82c",null);e["default"]=O.exports;v()(O,{VBtn:w["a"],VCard:S["a"],VCardActions:p["a"],VCardText:p["b"],VCombobox:A["a"],VDivider:V["a"],VIcon:T["a"],VImg:g["a"],VList:M["a"],VListGroup:N["a"],VListItem:f["a"],VListItemAvatar:C["a"],VListItemContent:y["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VMenu:U["a"],VSlideYTransition:b["e"],VSpacer:$["a"],VTextarea:L["a"]})},"636c":function(t,e,a){},e2b2:function(t,e,a){"use strict";var n=a("636c"),o=a.n(n);o.a}}]);
//# sourceMappingURL=article.50c054ae.js.map